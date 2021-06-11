import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { NavController } from '@ionic/angular';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';
import { UrlConstant } from 'src/app/constants/url.constants';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { ProductDetail } from 'src/app/models/product-details.model';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';

@Component({
  selector: 'app-productdetail-presentactionsheet',
  templateUrl: './productdetail-presentactionsheet.component.html',
  styleUrls: ['./productdetail-presentactionsheet.component.scss'],
})
export class ProductdetailPresentactionsheetComponent implements OnInit, OnDestroy {

  updateProductDetailsView: EventEmitter<boolean> = new EventEmitter<boolean>();

  // pdActionSheetSub: Subscription[] = [];

  constructor(
    private _productDetailService: ProductDetailService,
    private _navCtrl: NavController,
    private _actionSheetService: ActionSheetUtilService,
    private _alertService: AlertUtilService,
    private _msgService: MessageService
  ) { }

  ngOnInit() { }

  async presentActionSheet(element: ProductDetail) {
    await this._actionSheetService.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'Add Quantity',
          icon: 'cart-outline',
          cssClass: 'action-sheet-tertiary',
          handler: () => {
            // this._navCtrl.navigate([this.productDetail_url.edit + element.id]);
            this.updateQuantityAlert(element);
          }
        },
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateRoot(
              UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_EDIT + '/' + element.id
            );
          },
        },
        {
          text: 'Close',
          icon: 'close',
          cssClass: 'action-sheet-danger',
          role: 'cancel',
          handler: () => { },
        },
      ],
    });
  }

  async deleteAlert(id) {
    await this._alertService.presentAlert({
      header: 'Delete',
      message: 'Sure! Delete the Customer?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            // const deleteSub = this._productDetailService
            //   .deleteProductDetail(id)
            //   .subscribe(() => {
            //     this.fetchProductDetails();
            //   });
            // this.pdSubscription.push(deleteSub);
          },
        },
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
  }

  async updateQuantityAlert(element: ProductDetail) {
    await this._alertService.presentAlert({
      header: 'Add Quantity',
      backdropDismiss: false,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          value: 1,
          placeholder: 'Enter Quantity',
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: async (alertData) => {
            const quantity = alertData.quantity;
            if (quantity <= 0) {
              this._msgService.messageErrorAlert(null, ErrorConstant.ERR_QTY_GREATER_THAN_ZERO);
              return false;
            } else {
              try {
                await this._productDetailService.updateProductDetailQuantity(element.id, quantity);
                // this.setTimeOutCustom(loadingResult, SuccessConstants.SUCCESS_UPDATE_QTY);
                this._msgService.messageSuccessToast(SuccessConstants.SUCCESS_UPDATE_QTY);
                // emit the event once upate product detail quanity is updated
                this.updateProductDetailsView.emit(true);
              } catch (error) {
                this._msgService.messageErrorToast(error, ErrorConstant.ERR_QTY_ADDING);
              }
            }
          },
        },
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
  }

  // since we are using backend cache-control for 5 sec, any request within 5 sec will return the older data.
  // so setting the time-out
  // private setTimeOutCustom(loadingResult: HTMLIonLoadingElement, message: string) {
  //   setTimeout(() => {
  //     this._customToastCtrl.presentToast(message);
  //     // emit the event once upate product detail quanity is updated
  //     this.updateProductDetailsView.emit(true);
  //     loadingResult.dismiss();
  //   }, 2000);
  // }

  ngOnDestroy() {
    // this.pdActionSheetSub.forEach(sub => {
    //   if (sub) {
    //     sub.unsubscribe();
    //   }
    // });
  }
}
