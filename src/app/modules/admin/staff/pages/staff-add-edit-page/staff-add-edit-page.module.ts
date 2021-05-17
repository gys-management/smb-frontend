import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffAddEditPagePageRoutingModule } from './staff-add-edit-page-routing.module';

import { StaffAddEditPagePage } from './staff-add-edit-page.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StaffAddEditComponent } from '../../components/staff-add-edit/staff-add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffAddEditPagePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    StaffAddEditPagePage,
    StaffAddEditComponent
  ]
})
export class StaffAddEditPagePageModule { }
