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
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { SelectCustomerComponent } from './components/select-customer/select-customer.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { OrderController } from '../../utils/order-controller.util';
import { ProductdetailPresentactionsheetComponent }
  from '../product/product-details/components/productdetail-presentactionsheet/productdetail-presentactionsheet.component';
import { ProductDetailsPageModule } from '../product/product-details/product-details.module';

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
    IonicSelectableModule,
    PipeModule,
    ProductDetailsPageModule
  ],
  declarations: [
    OrderPage,
    OrderListComponent,
    OrderAddEditComponent,
    OrderViewComponent,
    SelectProductComponent,
    SelectCustomerComponent
  ],
  providers: [
    OrderService,
    ProductDetailService,
    OrderController,
    ProductdetailPresentactionsheetComponent
  ]
})
export class OrderPageModule { }
