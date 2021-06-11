import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.ORDER, true, UrlConstant.URL_ADMIN_ORDER);


  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onAdd() {
    this._navCtrl.navigateRoot(
      UrlConstant.URL_ADMIN_ORDER + UrlConstant.URL_ADD);
  }

}
