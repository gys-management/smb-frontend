import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerViewComponent } from './components/customer-view/customer-view.component';
import { ReminderPaymentController } from '../../utils/reminderPayment.controller';
import { CustomerAddEditComponent } from './components/customer-add-edit/customer-add-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomerPage,
    CustomerListComponent,
    CustomerViewComponent,
    CustomerAddEditComponent
  ],
  providers: [
    ReminderPaymentController
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerPageModule { }
