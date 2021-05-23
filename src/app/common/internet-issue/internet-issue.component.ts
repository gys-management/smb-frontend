import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-internet-issue',
  templateUrl: './internet-issue.component.html',
  styleUrls: ['./internet-issue.component.scss'],
})
export class InternetIssueComponent implements OnInit {

  headerModel = new HeaderModel(AppConstant.NETWORK_ERROR, false, UrlConstant.URL_LOGIN, false);


  errorMessage = AppConstant.ERR_INTERNET;
  imageURL = 'assets/image/Internet-Access-Error.jpg';

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navBack() {
    this._navCtrl.back();
  }
}
