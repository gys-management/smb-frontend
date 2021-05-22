import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss'],
})
export class OrderAddEditComponent implements OnInit {
  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_ORDER);

  constructor() { }

  ngOnInit() { }

}
