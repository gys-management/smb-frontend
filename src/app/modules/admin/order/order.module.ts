import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAddEditComponent } from './components/order-add-edit/order-add-edit.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderPage,
    OrderListComponent,
    OrderAddEditComponent,
    OrderViewComponent
  ]
})
export class OrderPageModule { }
