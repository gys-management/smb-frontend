import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.page.html',
  styleUrls: ['./product-brand.page.scss'],
})
export class ProductBrandPage implements OnInit {
  headerModel = new HeaderModel(AppConstant.PRODUCT_BRAND, true, UrlConstant.URL_ADMIN_PRODUCTS_BRAND);

  constructor() { }

  ngOnInit() {
  }

}
