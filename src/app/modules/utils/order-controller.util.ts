import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { OrderItem, Order, OrganizationConfig } from 'src/app/models/order.model';
import { ProductDetail } from 'src/app/models/product-details.model';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ToastUtilService } from 'src/app/services/util/toast/toast-util.service';

@Injectable()
export class OrderController {

  constructor(
    private _toastUtilCtrl: ToastUtilService,
    private _navCtrl: NavController,
    private _msgService: MessageService
  ) { }

  async checkQuanity(
    orderItem: OrderItem,
    checkNull: boolean = false,
    orderDetailLocal?: Order,
    saveOrupdate?: boolean,
    produtDetailListLocal?: ProductDetail[]
  ): Promise<boolean> {
    if (orderItem.quantity === null && checkNull) { // check the quanity is greater then one
      this._toastUtilCtrl.presentToast(orderItem.productName + ' is ' +
        ErrorConstant.ERR_UPDATE_QUANTITY_NULL, 1000);
      return Promise.resolve(false);
    } else if (orderItem.quantity != null && orderItem.quantity <= 0) {
      this._toastUtilCtrl.presentToast(orderItem.productName + ' is ' +
        ErrorConstant.ERR_UPDATE_QUANTITY, 1000);

      return Promise.resolve(false);
    } else if (orderItem.quantity != null && orderItem.quantity > 0
      && orderDetailLocal && produtDetailListLocal) {
      const quantityResponse = await this.quantityCheckOnAddOrUpdateOrderItem(
        orderDetailLocal, saveOrupdate, orderItem, produtDetailListLocal);
      return Promise.resolve(quantityResponse);
    } else {
      return Promise.resolve(true);
    }
  }

  async quantityCheckOnAddOrUpdateOrderItem(
    orderDetailLocal: Order,
    saveOrupdate: boolean,
    orderItem: OrderItem,
    produtDetailListLocal: ProductDetail[]
  ): Promise<boolean> {

    // copy by value, not reference
    const productDetail = this.jsonCopy(produtDetailListLocal.find(x => x.id === orderItem.productId));

    if (saveOrupdate) { // Add new Product check quantity
      return await this.quantityCheckOnOrderItem(productDetail, orderItem);
    } else { // Edit old product check quantity
      const existingOrderItem = orderDetailLocal.orderItems.find(x => x.productId === productDetail.id);
      if (existingOrderItem) {// check the order item already present
        productDetail.quantity = productDetail.quantity + existingOrderItem.quantity;
        return await this.quantityCheckOnOrderItem(productDetail, orderItem);
      }
      else { // if new product is added
        return await this.quantityCheckOnOrderItem(productDetail, orderItem);
      }
    }


  }

  async quantityCheckOnOrderItem(productDetail: ProductDetail, orderItem: OrderItem): Promise<boolean> {
    if (productDetail && orderItem.quantity > productDetail.quantity) {
      const customErrorMessage = productDetail.name + ErrorConstant.ERR_INSUFFICIENT_QUANTITY +
        '.\r Available Quantity - ' + productDetail.quantity;
      this._toastUtilCtrl.presentToast(customErrorMessage, 2000);
      // this._msgService.messageErrorAlert(null, customErrorMessage);
      return false;
    } else {
      return true;
    }
  }

  async checkDiscount(
    orderItem: OrderItem,
    checkNull: boolean = false
  ): Promise<boolean> {
    if (orderItem.discountUser === null && checkNull) {
      this._toastUtilCtrl.presentToast(orderItem.productName + ' is ' +
        ErrorConstant.ERR_UPDATE_DISCOUNT_NULL, 1000);
      return false;
    } else if (orderItem.discountUser != null && orderItem.discountUser < 0) {
      this._toastUtilCtrl.presentToast(orderItem.productName + ' is ' +
        ErrorConstant.ERR_UPDATE_DISCOUNT, 1000);
      return false;
    } else {
      return true;
    }
  }

  inclusiveGstCalculation(orderItem: OrderItem) {
    // sub-total cal
    const sellingPrice = orderItem.price + orderItem.basicPriceTax;
    const subTotalWithQuantity = sellingPrice * orderItem.quantity;

    // Gst amount cal
    const gstAmountTotal = this.inclusiveGstAmountCal(subTotalWithQuantity, orderItem.gstPercentage);

    // discount Amount cal
    const discountUser = orderItem.discountUser;
    const discountGstAmt = this.inclusiveGstAmountCal(discountUser, orderItem.gstPercentage);
    const discountActualLocal = discountUser - discountGstAmt;
    orderItem.discountActual = this.fixedConversion(discountActualLocal);
    orderItem.discountTax = this.fixedConversion(discountGstAmt);

    orderItem.subTotal = this.fixedConversion(subTotalWithQuantity - gstAmountTotal - discountActualLocal);
    orderItem.gstAmount = this.fixedConversion(gstAmountTotal - discountGstAmt);

    orderItem.cgstAmount = this.fixedConversion(orderItem.gstAmount / 2, 3);
    orderItem.sgstAmount = this.fixedConversion(orderItem.gstAmount / 2, 3);

    orderItem.totalAmount = orderItem.subTotal + orderItem.gstAmount;

    // margin for that order item
    if (orderItem.buyingPrice !== 0) {
      const marginInclGst = orderItem.totalAmount - (orderItem.buyingPrice * orderItem.quantity);
      const marginGstAmount = this.inclusiveGstAmountCal(marginInclGst, orderItem.gstPercentage);
      const marginActual = marginInclGst - marginGstAmount;
      orderItem.margin = this.fixedConversionMargin(marginActual);
    }
  }

  inclusiveGstAmountCal(amount, gstPercentage) {
    let amtCal = 0;
    if (amount > 0) {
      // GST calculation only for positive value
      amtCal = amount - (amount * (100 / (100 + gstPercentage)));
    }
    return amtCal;
  }

  exclusiveGstCalculation(orderItem: OrderItem) {
    // sub-total cal
    const sellingPrice = orderItem.price;
    const subTotalLocal = (sellingPrice * orderItem.quantity);

    // Gst amount cal
    const gstAmountTotal = this.exclusiveGstAmountCal(subTotalLocal, orderItem.gstPercentage);

    // discount Amount cal
    const discountUser = orderItem.discountUser;
    const discountGstAmt = this.exclusiveGstAmountCal(discountUser, orderItem.gstPercentage);
    const discountActualLocal = discountUser;
    orderItem.discountActual = this.fixedConversion(discountActualLocal);
    orderItem.discountTax = discountGstAmt;

    orderItem.subTotal = this.fixedConversion(subTotalLocal - discountActualLocal);
    orderItem.gstAmount = this.fixedConversion(gstAmountTotal - discountGstAmt);

    orderItem.cgstAmount = this.fixedConversion(orderItem.gstAmount / 2, 3);
    orderItem.sgstAmount = this.fixedConversion(orderItem.gstAmount / 2, 3);

    // margin for that order item
    if (orderItem.buyingPrice !== 0) {
      orderItem.margin = this.fixedConversionMargin(orderItem.subTotal -
        (orderItem.buyingPrice * orderItem.quantity));
    }
    orderItem.totalAmount = orderItem.subTotal + orderItem.gstAmount;
  }

  exclusiveGstAmountCal(amount, gstPercentage) {
    let amtCal = 0;
    if (amount > 0) {
      // GST calculation only for positive value
      amtCal = (amount * gstPercentage) / 100;
    }
    return amtCal;
  }

  fixedConversion(num: number, digits: number = 2) {
    if (num > 0) {
      return +num.toFixed(digits);
    } else {
      return 0;
    }
  }

  fixedConversionMargin(num: number) {
    return +num.toFixed(2);
  }

  // async doubleCheckOnQuanityWhileSaving(dataSource: MatTableDataSource<OrderItem>): Promise<boolean> {
  //   const result = [];
  //   const orderItem = dataSource.data;
  //   return new Promise((resolve, reject) => {
  //     for (let index = 0; index < orderItem.length; index++) {
  //       this.checkQuanity(orderItem[index], true).then(checkQuanity => {
  //         result.push(checkQuanity); // push the result to array

  //         // check whether the index is last and result array dosn't contain the false
  //         if (index === orderItem.length - 1 && !result.includes(false)) {
  //           resolve(true);
  //         } else if (!checkQuanity) {
  //           resolve(false);
  //         }
  //       });
  //     }
  //   });

  // }

  async doubleCheckOnDiscountWhileSaving(dataSource): Promise<boolean> {
    let result = true;
    dataSource.data.forEach(async (x: OrderItem) => {
      const valueCheckDiscount = await this.checkDiscount(x, true);
      switch (valueCheckDiscount) {
        case false:
          result = false;
          break;
      }
    });
    return result;
  }

  orderItemListIteration(dataSource) {
    const confirmOrderItemList: OrderItem[] = [];
    // iterater the datasource and update the order items
    dataSource.data.forEach((x) => {
      const orderItem: OrderItem = { ...x };
      confirmOrderItemList.push(orderItem);
    });
    return confirmOrderItemList;
  }

  navBacktoPreviousPage(element: HTMLIonLoadingElement) {
    // navigation to previous page instead of hardcode path
    this._navCtrl.back();
    element.dismiss();
  }


  displayErrorMessage(error: any, defaultError) {
    const errorCode = error.CustomError.errorCode;
    const errorBody = error.CustomError.errorBody;
    if (errorCode) {
      const customErrorMessage = errorBody.name + ErrorConstant[errorCode] + '. Kindly Update the sufficient quantity';
      this._toastUtilCtrl.presentToast(customErrorMessage, 2000);
    } else {
      this._toastUtilCtrl.presentToast(defaultError);
    }
  }


  // shallow deep or copy by value, not reference
  // Object.assign will not work for nested values
  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  roundOffAmount(value: number, configuration: OrganizationConfig): number {
    let finalRoundOffAmount: number;
    const roundOffValue: number = configuration.orderConfig.roundOff;
    // const roundOffValue = 1;
    const converted: number = parseFloat(value.toString()); // Make sure we have a number
    const decimal: number = this.fixedConversion(converted - parseInt(converted.toString(), 10));
    if (decimal === 0) {
      finalRoundOffAmount = parseInt(converted.toString(), 10);
    } else if (decimal === 0.50) {
      finalRoundOffAmount = (parseInt(converted.toString(), 10) + roundOffValue);
    }
    else if (decimal > 0.50) {
      finalRoundOffAmount = Math.round(converted);
    } else {
      finalRoundOffAmount = (parseInt(converted.toString(), 10) + roundOffValue);
    }

    return finalRoundOffAmount;
  }

}
