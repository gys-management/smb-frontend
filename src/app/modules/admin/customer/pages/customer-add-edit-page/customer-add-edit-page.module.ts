import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerAddEditPagePageRoutingModule } from './customer-add-edit-page-routing.module';

import { CustomerAddEditPagePage } from './customer-add-edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerAddEditPagePageRoutingModule
  ],
  declarations: [CustomerAddEditPagePage]
})
export class CustomerAddEditPagePageModule {}
