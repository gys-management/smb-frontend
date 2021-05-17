import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-staff-add-edit-page',
  templateUrl: './staff-add-edit-page.page.html',
  styleUrls: ['./staff-add-edit-page.page.scss'],
})
export class StaffAddEditPagePage implements OnInit {
  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_STAFF);

  constructor() { }

  ngOnInit() {
  }

}
