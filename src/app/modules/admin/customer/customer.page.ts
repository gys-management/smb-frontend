import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.CUSTOMER, true, UrlConstant.URL_ADMIN_CUSTOMER);

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  onAdd() {
    this._navCtrl.navigateRoot(
      UrlConstant.URL_ADMIN_STAFF + UrlConstant.URL_ADD);
  }

}
