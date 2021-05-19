import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.PRODUCT, true, UrlConstant.URL_ADMIN_PRODUCTS);

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  onAdd() {
    this._navCtrl.navigateForward(
      UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_ADD);
  }

}
