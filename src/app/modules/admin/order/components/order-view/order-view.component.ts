import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { OrderStatus } from 'src/app/enum/order-status.enum';
import { Customer } from 'src/app/models/customer.model';
import { HeaderModel } from 'src/app/models/header.model';
import { Order, OrderItem } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { Payment } from 'src/app/models/payments/payment.model';
import { PaymentHistoryComponent } from 'src/app/modules/shared/payment/payment-history/payment-history.component';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit, OnDestroy {
  headerModel = new HeaderModel(AppConstant.DETAILS, false, UrlConstant.URL_ADMIN_ORDER);

  detailOrderSub: Subscription[] = [];
  form: FormGroup;
  customer: Customer;
  organization: Organization;
  orderDetail: Order;
  orderStatus = OrderStatus;

  expandedElement: OrderItem | null;
  displayedColumns: string[] = [
    'productName',
    'price',
    'quantity',
    'discount',
    'subTotal',
    'gstAmount',
    'totalAmount'
  ];
  dataSource: MatTableDataSource<OrderItem>;


  constructor(
    private _activedRoute: ActivatedRoute,
    private _customerService: CustomerService,
    private _organizationService: OrganizationService,
    private _orderService: OrderService,
    private _navCtrl: NavController,
    // private _pdfService: PdfService,
    private _actionService: ActionSheetUtilService,
    private _paymentService: PaymentService,
    private _modalUtilService: ModalUtilService,
    private _msgService: MessageService
  ) { }

  ngOnInit() {
    this.loadActivatedParams();
  }

  async loadActivatedParams() {
    const actived = await this._activedRoute.paramMap.pipe(take(1)).toPromise();
    const id = actived.get('id');
    if (!id) {
      this._navCtrl.navigateRoot(UrlConstant.URL_ADMIN_ORDER);
    }
    else {
      this.fetchOrderbyIDLocal(id);
    }
  }

  async fetchOrderbyIDLocal(id: string) {

    const order = await this._orderService.getOrderById(id);
    try {
      this.orderDetail = order;
      this.dataSource = new MatTableDataSource(this.orderDetail.orderItems);
      this.dataSource.filter = '';
      this.getCustomerDetailsById(order.customerId);
      this.fetchOrganization();
      this.formControl();
    } catch (error) {
      this._msgService.messageErrorToast(error);
    };

  }

  async formControl() {
    this.form = new FormGroup({
      customerId: new FormControl(this.orderDetail.customerId, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      orderNumber: new FormControl(this.orderDetail.orderNumber),
      invoiceNumber: new FormControl(this.orderDetail.invoiceNumber, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      reference: new FormControl(this.orderDetail.reference, {
        updateOn: 'change',
      }),
      orderedDate: new FormControl(this.orderDetail.orderedDate, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      estimatedDeliveryDate: new FormControl(this.orderDetail.estimatedDeliveryDate, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      deliveredDate: new FormControl(this.orderDetail.deliveredDate, {
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
    this.customer = await this._customerService.getCustomerById(customerId);
  }

  fetchOrganization() {
    const organizationSub = this._organizationService.getOrganizationById.subscribe(
      (organization) => {
        if (organization) {
          this.organization = organization;
        }
      }
    );
    this.detailOrderSub.push(organizationSub);

  }

  generateInvoice(option) {
    // PDF will work only browser. If you convert as app, have to implement on file download in ionic way
    // this._pdfService.generateInvoice(this.orderDetail, this.organization, this.customer, option);
  }

  async presentActionSheet() {
    const buttons = this.actionSheetButtons();
    await this._actionService.presentActionSheet({
      header: 'Action',
      buttons,
    });
  }

  actionSheetButtons() {
    const order = this.orderDetail;
    const button = [];
    if (order.orderStatus === OrderStatus.ORDERED) {
      button.push(
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateRoot(UrlConstant.URL_EDIT + '/' + order.id);
          }
        });
    }
    if (order.orderStatus !== OrderStatus.CANCELLED) {
      button.push(
        {
          text: 'Open',
          icon: 'folder-open-outline',
          cssClass: 'action-sheet-instagram',
          handler: () => {
            this.generateInvoice('open');
          },
        },
        {
          text: 'Download',
          icon: 'arrow-down-circle-outline',
          cssClass: 'action-sheet-facebook',
          handler: () => {
            this.generateInvoice('download');
          },
        },
        {
          text: 'Print',
          icon: 'print-outline',
          cssClass: 'action-sheet-secondary',
          handler: () => {
            this.generateInvoice('print');
          },
        }
      );
    }
    if (order.orderStatus === OrderStatus.COMPLETED) {
      button.push(
        {
          text: 'Send Email',
          icon: 'send-outline',
          cssClass: 'action-sheet-tertiary',
          handler: () => {
            this.generateInvoice('email');
          },
        }
      );
    }
    // finally add close button
    button.push(
      {
        text: 'Payment History',
        icon: 'wallet-outline',
        cssClass: 'action-sheet-google',
        handler: () => {
          this.getPaymentHistoryByOrderId(order.id);
        },
      },
      {
        text: 'Close',
        icon: 'close',
        cssClass: 'action-sheet-danger',
        role: 'cancel',
        handler: () => { }
      });
    return button;
  }

  async getPaymentHistoryByOrderId(orderId: string) {
    // TODO: will implement the payment is integrated
    const paymentHistory: Payment[] = await this._paymentService.getPaymentByOrderId(orderId);
    try {
      await this._modalUtilService.presentModalNew({
        component: PaymentHistoryComponent,
        componentProps: { paymentHistoryListOrderDetailPage: paymentHistory }
      });
    } catch {

    }
  }

  ngOnDestroy() {
    this.detailOrderSub.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}

