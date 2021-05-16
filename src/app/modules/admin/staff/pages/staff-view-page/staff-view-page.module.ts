import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffViewPagePageRoutingModule } from './staff-view-page-routing.module';

import { StaffViewPagePage } from './staff-view-page.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StaffViewComponent } from '../../components/staff-view/staff-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffViewPagePageRoutingModule,
    SharedModule
  ],
  declarations: [
    StaffViewPagePage,
    StaffViewComponent
  ]
})
export class StaffViewPagePageModule { }
