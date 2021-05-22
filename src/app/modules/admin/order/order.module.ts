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
import { OrderService } from 'src/app/services/order.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
  ],
  declarations: [
    OrderPage,
    OrderListComponent,
    OrderAddEditComponent,
    OrderViewComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderPageModule { }
