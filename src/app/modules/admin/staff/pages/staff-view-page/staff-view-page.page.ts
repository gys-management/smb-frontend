import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-staff-view-page',
  templateUrl: './staff-view-page.page.html',
  styleUrls: ['./staff-view-page.page.scss'],
})
export class StaffViewPagePage implements OnInit {
  headerModel = new HeaderModel(AppConstant.DETAILS, false, UrlConstant.URL_ADMIN_STAFF);

  constructor() { }

  ngOnInit() {
  }

}
