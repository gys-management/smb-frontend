import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { OrderStatus } from 'src/app/enum/order-status.enum';
import { PaymentMode } from 'src/app/enum/paymen.enum';
import { Customer } from 'src/app/models/customer.model';
import { HeaderModel } from 'src/app/models/header.model';
import { Order, OrderItem, OrganizationConfig } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { ProductDetail } from 'src/app/models/product-details.model';
import { OrderController } from 'src/app/modules/utils/order-controller.util';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { OrganizationConfigService } from 'src/app/services/organization-config.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { LoggerService } from 'src/app/services/util/logger/logger.service';
import { MessageService } from 'src/app/services/util/messages/message.service';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss'],
})
export class OrderAddEditComponent implements OnInit, OnDestroy {

  @ViewChild('orderItemSelectable') orderItemSelectable: IonicSelectableComponent;
  @ViewChild('cusomterSelectable') cusomterSelectable: IonicSelectableComponent;
  @ViewChild('SelectCustomerComponent') selectCustomerComponent;

  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_ORDER);

  order_url;
  form: FormGroup;
  editOrderSub: Subscription[] = [];
  productDetailList: ProductDetail[] = [];
  // productDetail: ProductDetail;
  customerList: Customer[] = [];
  customer: Customer;
  organization: Organization;
  orderList: Order[] = [];
  minDate: string;
  orderDetail: Order;
  configuration: OrganizationConfig;

  displayButtonText: string;

  paymentModeArray = PaymentMode;

  // true = save new record
  // false = update existing record
  saveOrupdate = true;

  // cusomterSelectable search
  currentPage = 0;
  fetchCountPerPage = 30;
  totalpage = 0;

  expandedElement: OrderItem | null;

  //   displayedColumns: string[] = ['productName', 'price', 'quantity', 'discount', 'subTotal', 'gstAmount', 'totalAmount', 'action'];
  displayedColumns: string[] = [
    'productName',
    'price',
    // 'quantity',
    // 'discount',
    // 'subTotal',
    // 'gstAmount',
    'totalAmount',
    'action',
  ];
  dataSource: MatTableDataSource<OrderItem>;

  // Select Product event emitter
  selectProductDetailList: EventEmitter<ProductDetail[]> = new EventEmitter<ProductDetail[]>();
  deletedOrderItem: EventEmitter<ProductDetail> = new EventEmitter<ProductDetail>();

  constructor(
    private _activedRoute: ActivatedRoute,
    private _customerService: CustomerService,
    private _organizationService: OrganizationService,
    private _orderService: OrderService,
    private _productDetailService: ProductDetailService,
    private _navCtrl: NavController,
    private _msgService: MessageService,
    private _orderController: OrderController,
    private _orgConfigService: OrganizationConfigService
  ) { }

  async ngOnInit() {
    this.fetchOrganization();
    this.initializeFields();
    this.loadConfigurationDetails();
  }

  async fetchOrganization() {
    const organizationSub = this._organizationService.getOrganizationById.subscribe(
      (organization) => {
        if (organization) {
          this.organization = organization;
        }
      }
    );
    this.editOrderSub.push(organizationSub);

  }

  async initializeFields() {
    this.minDate = new Date().toISOString();
    this.dataSource = new MatTableDataSource<OrderItem>();

    const actived = await this._activedRoute.paramMap.pipe(take(1)).toPromise();
    const id = actived.get('id');

    if (!id) {
      this.saveOrupdate = true;

      this.displayButtonText = AppConstant.SAVE;
      this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_ORDER, false);

      this.loadDefaultOrderDetails();
    } else {

      this.saveOrupdate = false;

      this.displayButtonText = AppConstant.UPDATE;
      this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_ORDER, false);

      this.fetchOrderbyIDLocal(id);
    }

  }

  async loadDefaultOrderDetails() {
    try {
      const orderCount = await this._orderService.fetchOrderCount();

      this.orderDetail = new Order();
      this.orderDetail.orderNumber = orderCount + 1;
      this.orderDetail.orderedDate = new Date().toISOString();


    } catch (error) {
      this._msgService.messageErrorToast(null, ErrorConstant.ERR_FETCHING_TOTAL_COUNT);
    }
    this.formControl();
    this.orderDateChanges();
  }


  async fetchOrderbyIDLocal(id: string) {
    const order = await this._orderService.getOrderById(id);
    try {
      const checkOrderStatus = await this.checkOrderStatusIsPending(order);
      if (checkOrderStatus) {
        this.orderDetail = this._orderController.jsonCopy(order);
        this.dataSource = new MatTableDataSource(order.orderItems);
        this.dataSource.filter = '';

        // convert selected orderItems to productDetails And added to productDetail list & emit.
        const pdList = await this.orderItemsExtractionToProductDetail(this.dataSource.data);
        this.selectProductDetailList.emit(pdList);

        // this.productDetailLocalSelectableChange(null);
        this.getCustomerDetailsById(order.customerId);
        this.formControl();
        this.form.get('orderedDate').disable();
        this.form.get('amountPaid').disable();
        this.form.get('paymentMode').disable();
        this.saveOrupdate = false;
      } else {
        this._navCtrl.navigateRoot(UrlConstant.URL_ADMIN_ORDER);
      }
    } catch (error) {
      this._msgService.messageErrorToast(error, ErrorConstant.ERR_FETCHING_ORDER_DETAILS);
    }
  }

  async checkOrderStatusIsPending(order: Order): Promise<boolean> {
    if (order.orderStatus === OrderStatus.ORDERED) {
      return true;
    } else {
      this._msgService.messageErrorToast(null, ErrorConstant.ERR_EDITING_ORDERS);
      return false;
    }
  }

  async formControl() {
    this.form = new FormGroup({
      customerId: new FormControl(this.orderDetail.customerId, {
        updateOn: 'change',
        // validators: [Validators.required],
      }),
      orderNumber: new FormControl(this.orderDetail.orderNumber),
      reference: new FormControl(this.orderDetail.reference, {
        updateOn: 'change',
      }),
      invoiceNumber: new FormControl(this.orderDetail.invoiceNumber, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      orderedDate: new FormControl(this.orderDetail.orderedDate, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      estimatedDeliveryDate: new FormControl(this.orderDetail.estimatedDeliveryDate, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      subTotal: new FormControl(this.orderDetail.subTotal, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      // discount: new FormControl(this.orderDetail.discount, {
      //   updateOn: 'change',
      //   validators: [Validators.required]
      // }),
      finalAmount: new FormControl(this.orderDetail.finalAmount, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      gstAmount: new FormControl(this.orderDetail.gstAmount, {
        updateOn: 'change',
      }),
      // igstAmount: new FormControl(this.orderDetail.igstAmount, {
      //   updateOn: 'change',
      //   validators: [Validators.required]
      // }),
      cgstAmount: new FormControl(this.orderDetail.cgstAmount, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      sgstAmount: new FormControl(this.orderDetail.sgstAmount, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      amountPaid: new FormControl(this.orderDetail.amountPaid, {
        updateOn: 'change',
        validators: [Validators.min(0)],
      }),
      paymentMode: new FormControl(this.orderDetail.amountPaid, {
        updateOn: 'change'
      }),
      paymentReference: new FormControl(this.orderDetail.paymentReference, {
        updateOn: 'change'
      }),
      total: new FormControl(this.orderDetail.total, {
        updateOn: 'change'
      }),
      roundOffAmount: new FormControl(this.orderDetail.roundOffAmount, {
        updateOn: 'change'
      })
    });
  }

  async getCustomerDetailsById(customerId) {
    const cust = await this._customerService.getCustomerById(customerId);
    this.customer = cust;

  }

  async loadConfigurationDetails() {
    const configServiceSub = this._orgConfigService.getOrganizationConfig.subscribe(
      (config) => {
        if (config) {
          this.configuration = config;
        }
      },
      (error) => {
        this._msgService.messageErrorToast(null, ErrorConstant.ERR_FETCH_CONFIG);
      }
    );
    this.editOrderSub.push(configServiceSub);
  }

  async orderDateChanges() {
    const orderDateLocal = new Date(this.form.get('orderedDate').value);
    // estimatedDeliveryDate should be 2 days from orderedDate
    const estimatedDeliveryDate = new Date(
      orderDateLocal.setDate(orderDateLocal.getDate() + this.configuration.orderConfig.estimatedDeliveryDays)
    ).toISOString();
    this.form.get('estimatedDeliveryDate').patchValue(estimatedDeliveryDate);
  }

  // Start:  Order Items
  async productDetailLocalSelectableChange(event: IonicSelectableComponent) {
    const orderItemList = await this.productDetailExtractionToOrderItems(event.value);

    // slice the items from the orderItem list array
    orderItemList.forEach((orderItem) => {
      this.dataSource.data.forEach((datasourceOrderItem) => {
        /**
         * we have introduced the margin field in Release v1.0.3. For margin calculation buying price  is required.
         * new items buying price can get from selectable, but for existing products while editing the buying price will not be available.
         * hence setting the below fields.
         */
        datasourceOrderItem.buyingPrice = orderItem.buyingPrice;
        //  check already selected orderItem and newly selected orderitem are same?
        if (datasourceOrderItem.productId === orderItem.productId) {
          // get the orderItem index of newly selected orderitem
          const index = orderItemList.indexOf(orderItem);
          // splice the newly selected orderitem from OrderItemList and
          // replace with already selected orderitem to OrderItemList
          orderItemList.splice(index, 1, datasourceOrderItem);
        }
      });
    });

    this.dataSource.data = orderItemList;
  }

  productDetailExtractionToOrderItems(productDetail: ProductDetail[]) {
    const orderItemList: OrderItem[] = [];
    if (productDetail.length > 0) {
      productDetail.forEach((x) => {
        const localOrderItem: OrderItem = {
          productId: x.id,
          productName: x.name,
          price: x.basicPrice,
          discountUser: +x.discount,
          quantity: 1,
          gstPercentage: x.gstPercentage,
          gstAmount: null,
          igstAmount: null,
          sgstAmount: null,
          cgstAmount: null,
          gstIncluded: x.gstIncluded,
          basicPriceTax: x.basicPriceTax,
          buyingPrice: x.buyingPrice,
          margin: null,
          sellingPrice: x.sellingPrice
        };
        // this.orderItemListView.push(localOrderItem);
        orderItemList.push(localOrderItem);
        // this.orderItemListPage.push(localOrderItem);
      });
      //  the productDetaillist will useful while checking the quanity for adding new order item
      this.productDetailList = this._orderController.jsonCopy(productDetail);

      return orderItemList;
    }

  }

  async orderItemsExtractionToProductDetail(orderItem: OrderItem[]) {
    const prodctDetailIds = [];
    orderItem.forEach(element => {
      // push the product detail ids
      prodctDetailIds.push(element.productId);
    });
    this.productDetailList = await this._productDetailService.fetchProductDetailByIdsList(prodctDetailIds);

    return this.productDetailList;
  }

  onDeleteRow(deleteObject: OrderItem) {
    // filter the object and remove from list
    this.dataSource.data = this.dataSource.data.filter((x) => x.productId !== deleteObject.productId);
    this._msgService.messageSuccessToast(SuccessConstants.SUCCESS_DELETED_ORDER_ITEM + deleteObject.productName);

    // notify to product selection as this orderItem is removed from list
    const productDetail = new ProductDetail();
    productDetail.id = deleteObject.productId;
    this.deletedOrderItem.emit(productDetail);

    this.orderItemFieldsTotalChange();

  }

  // Triggers when order Item any field changes
  async orderItemFieldsChange(orderItem: OrderItem) {
    if (orderItem !== null && orderItem !== undefined) {
      const checkQuanityVariable = await this._orderController.checkQuanity(
        orderItem,
        false,
        this.orderDetail,
        this.saveOrupdate,
        this.productDetailList);

      const checkDiscountVariable = await this._orderController.checkDiscount(orderItem);

      //  NOTE: Below check will not valid since the qty can go on minus value
      // if (!checkQuanityVariable || !checkDiscountVariable) {
      //   return;
      // } else
      if (orderItem.gstIncluded) {  // GST and Amount calculation
        this._orderController.inclusiveGstCalculation(orderItem);
      } else {
        this._orderController.exclusiveGstCalculation(orderItem);
      }

      // set active as true in item for total amount calculation.
      this.dataSource.data.forEach((x) => {
        x.active = true;
      });

      this.orderItemFieldsTotalChange();
    }

  }

  // Triggers when order Item total changes
  orderItemFieldsTotalChange() {
    let amountLocal = 0;
    let gstAmount = 0;
    let cgstAmount = 0;
    let sgstAmount = 0;
    let roundOffAmount = 0;
    let finalAmount = 0;
    let total = 0;

    if (this.dataSource.data.length === 0) {
      this.form.get('subTotal').patchValue(amountLocal);
      // this.form.get('discount').patchValue(amountLocal);
      this.form.get('sgstAmount').patchValue(sgstAmount);
      this.form.get('cgstAmount').patchValue(cgstAmount);
      this.form.get('total').patchValue(total);
      this.form.get('roundOffAmount').patchValue(roundOffAmount);
      this.form.get('finalAmount').patchValue(finalAmount);
    } else {
      this.dataSource.data.forEach((orderItemLocal: OrderItem) => {
        // set Active to false to avoid the repeated iteration
        orderItemLocal.active = false;

        amountLocal = this._orderController.fixedConversion(amountLocal + orderItemLocal.subTotal);
        total = this._orderController.fixedConversion(total + orderItemLocal.totalAmount);
        gstAmount = this._orderController.fixedConversion(gstAmount + orderItemLocal.gstAmount);
        cgstAmount = this._orderController.fixedConversion(gstAmount / 2, 3);
        sgstAmount = this._orderController.fixedConversion(gstAmount / 2, 3);
        finalAmount = this._orderController.roundOffAmount(total, this.configuration);

        roundOffAmount = this._orderController.fixedConversion(finalAmount - total);

        this.form.get('subTotal').patchValue(amountLocal);
        this.form.get('gstAmount').patchValue(gstAmount);

        this.form.get('sgstAmount').patchValue(sgstAmount);
        this.form.get('cgstAmount').patchValue(cgstAmount);
        this.form.get('total').patchValue(total);
        this.form.get('roundOffAmount').patchValue(roundOffAmount);
        this.form.get('finalAmount').patchValue(finalAmount);
      });
    }
  }

  discountTotalChange() {
    // const amount = this.form.get('subTotal').value;
    // const discount = this.form.get('discount').value;

    // this.finalAmount = this.fixedConversion(amount - discount);
    // this.form.get('finalAmount').patchValue(this.finalAmount);
  }

  totalPaidChange() {
    // Paid amount should be greater than final amount
    // if (this.orderDetail.totalPaid < 0 || this.orderDetail.totalPaid > this.orderDetail.finalAmount) {
    //   this.orderDetail.totalPaid = null;
    //   this._customToastCtrl.presentToast(OrderConstant.order_error.TotalPaid)
    // }
  }

  customerSelectableChange(customerDetail) {
    this.customer = customerDetail;
  }

  isAmountPaidShouldNotGreaterThanFinalAmount() {
    let result = 0;
    const amountPaidLocal = this.form.get('amountPaid').value;
    const finalAmountLocal = this.form.get('finalAmount').value;
    // this.form.get('paymentMode').patchValue(''); // reset the payment mode
    if (amountPaidLocal && amountPaidLocal >= 0) {
      // Check whether user selected atleast one product
      if (this.atleastOneOrderItemCheck()) {
        // Check whether amount paid is greater than total Amount
        if (amountPaidLocal > finalAmountLocal) {
          this._msgService.messageErrorAlert(null, ErrorConstant.ERR_AMT_GREATER_PAYMENT);
          result = 1;
        } else {
          result = 2;
        }
      }
    } else if (amountPaidLocal && amountPaidLocal < 0) {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_NEGATIVE_PAYMENT);
      result = 3;
    }
    /*
    0 - no error
    1-  Amt is greater than final Amt
    2-  Amt is not greater
    3- Negative Value
    */
    return result;
  }

  amountPaidCheck() {
    if (this.saveOrupdate) { // this condition only for new order, not for existing
      const amtGreaterThanFinalAmt = this.isAmountPaidShouldNotGreaterThanFinalAmount();
      if (amtGreaterThanFinalAmt === 2) {
        // Check whehter payment mode is selected or not
        const paymentModeLocal = this.form.get('paymentMode').value;
        if (!paymentModeLocal) {
          this._msgService.messageErrorAlert(null, ErrorConstant.ERR_SELECT_PAYMENTMODE);
          return false;
        } else {
          return true;
        }
      } else if (amtGreaterThanFinalAmt === 3) { // negative result
        return false;
      } else if (amtGreaterThanFinalAmt === 0) { // result is zero
        return true;
      }
    } else {
      return true;
    }


  }

  atleastOneOrderItemCheck() {
    // order item more than one return true else false
    if (this.dataSource.data.length <= 0) {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_SELECT_PRODDUCT);
      return false;
    } else {
      return true;
    }
  }

  async onClick() {
    this.form.markAllAsTouched();
    if (!this.customer) {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_SELECT_CUSTOMER);
      return;
    } else if (!this.form.get('invoiceNumber').value) {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_FIELD_INVOICE);
      return;
    } else if (!this.atleastOneOrderItemCheck()) {
      return;
    } else if (!this.amountPaidCheck()) {
      return;
    } else if (this.form.invalid) {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_MANDTORY_FIELDS);
      return;
    } else {

      const discountWhileSaving = await this._orderController.doubleCheckOnDiscountWhileSaving(this.dataSource);
      // const quantityWhileSaving = await this._orderController.doubleCheckOnQuanityWhileSaving(this.dataSource);

      // if (discountWhileSaving && quantityWhileSaving) {
      if (discountWhileSaving) {

        if (this.saveOrupdate) {
          this.onAddOrder();
        } else {
          this.onUpdateOrder();
        }
      }
    }

  }

  async onAddOrder() {
    const order: Order = await this.formToOrderMapping();
    LoggerService.debug('OrderAddEditComponent :: onAddOrder', order);
    if (order) {
      try {
        await this._orderService.saveOrder(order);
        this.onCancel();
      } catch (error) {
        this._msgService.messageErrorToast(error);
      }
    }
  }

  async onUpdateOrder() {
    const order: Order = await this.formToOrderMapping();
    if (order) {
      try {
        await this._orderService.updateOrder(this.orderDetail.id, order);
        this.onCancel();
      } catch (error) {
        this._msgService.messageErrorToast(error);
      }
    }
  }

  onCancel() {
    this._navCtrl.back();
  }

  async formToOrderMapping() {
    const formValue = await this.form.getRawValue();
    let paymentModeLocal = formValue.paymentMode;
    let orderMarginLocal = 0;
    if (formValue.amountPaid === 0) {
      paymentModeLocal = null;
    }

    this.dataSource.data.forEach(data => {
      orderMarginLocal = orderMarginLocal + data.margin;
    });

    const confirmOrderItemList: OrderItem[] = this._orderController.orderItemListIteration(this.dataSource);
    if (confirmOrderItemList.length > 0) {
      // form to Order mapping
      const order: Order = {
        customerId: this.customer.id,
        orderNumber: formValue.orderNumber,
        invoiceNumber: formValue.invoiceNumber,
        reference: formValue.reference,
        orderedDate: this.form.get('orderedDate').value,
        estimatedDeliveryDate: formValue.estimatedDeliveryDate,
        subTotal: formValue.subTotal,
        discount: formValue.discount,
        finalAmount: formValue.finalAmount,
        orderItems: confirmOrderItemList,
        gstAmount: formValue.gstAmount,
        igstAmount: formValue.igstAmount,
        sgstAmount: formValue.sgstAmount,
        cgstAmount: formValue.cgstAmount,
        amountPaid: formValue.amountPaid,
        paymentMode: paymentModeLocal,
        paymentReference: formValue.paymentReference,
        total: formValue.total,
        roundOffAmount: formValue.roundOffAmount,
        orderMargin: this._orderController.fixedConversionMargin(orderMarginLocal)
      };

      if (!this.saveOrupdate) {
        order.id = this.orderDetail.id;
        // payment details will not be updated for edit order
        order.amountPaid = this.orderDetail.amountPaid;
        order.paymentMode = this.orderDetail.paymentMode;
        order.paymentReference = this.orderDetail.paymentReference;
      }
      return order;
    }

  }

  ngOnDestroy() {
    this.editOrderSub.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

