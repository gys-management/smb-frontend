import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-product-details-add-edit',
  templateUrl: './product-details-add-edit.page.html',
  styleUrls: ['./product-details-add-edit.page.scss'],
})
export class ProductDetailsAddEditPage implements OnInit {

  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS);

  constructor() { }

  ngOnInit() {
  }

}
