import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-customer-view-page',
  templateUrl: './customer-view-page.page.html',
  styleUrls: ['./customer-view-page.page.scss'],
})
export class CustomerViewPagePage implements OnInit {
  headerModel = new HeaderModel(AppConstant.CUSTOMER, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

  constructor() { }

  ngOnInit() {
  }

}
