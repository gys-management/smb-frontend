import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerAddEditPagePageRoutingModule } from './customer-add-edit-page-routing.module';

import { CustomerAddEditPagePage } from './customer-add-edit-page.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerAddEditPagePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerAddEditPagePage]
})
export class CustomerAddEditPagePageModule { }
