import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerViewPagePageRoutingModule } from './customer-view-page-routing.module';

import { CustomerViewPagePage } from './customer-view-page.page';
import { CustomerViewComponent } from '../../components/customer-view/customer-view.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderPaymentController } from 'src/app/modules/utils/reminderPayment.controller';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerViewPagePageRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerViewPagePage,
    CustomerViewComponent
  ],
  providers: [
    ReminderPaymentController
  ]
})
export class CustomerViewPagePageModule { }
