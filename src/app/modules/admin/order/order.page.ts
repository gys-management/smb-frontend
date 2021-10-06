import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.ORDER, true, UrlConstant.URL_ADMIN_ORDER);


  constructor(
    private _navCtrl: NavController,
    private _alertService: AlertUtilService
  ) { }

  ngOnInit() {
  }

  onAdd(id: string) {
    const navigationExtras: NavigationExtras = { queryParams: { pcid: id } };
    this._navCtrl.navigateRoot(
      UrlConstant.URL_ADMIN_ORDER + UrlConstant.URL_ADD,
      navigationExtras);
  }

  onModalOpen() {
    this._alertService.presentAlert({
      header: 'Select the Option',
      buttons: [
        {
          text: 'Product',
          handler: () => {
            const id = AppConstant.PRODUCT_CATEGORY_ID_PRODUCT;
            this.onAdd(id);
          }
        },
        {
          text: 'Service',
          handler: () => {
            const id = AppConstant.PRODUCT_CATEGORY_ID_SERVICE;
            this.onAdd(id);
          },
        }
      ]
    });
  }

}
