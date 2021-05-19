import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.STAFF, true, UrlConstant.URL_ADMIN_STAFF);

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  onAdd() {
    this._navCtrl.navigateForward(
      UrlConstant.URL_ADMIN_STAFF + UrlConstant.URL_ADD);
  }

}
