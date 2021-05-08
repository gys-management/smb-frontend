import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
