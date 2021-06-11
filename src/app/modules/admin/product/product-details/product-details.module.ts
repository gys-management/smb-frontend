import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProductDetailsListComponent } from './components/product-details-list/product-details-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsAddEditComponent } from './components/product-details-add-edit/product-details-add-edit.component';
import { ProductdetailPresentactionsheetComponent }
  from './components/productdetail-presentactionsheet/productdetail-presentactionsheet.component';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductBrandService } from 'src/app/services/product-brand.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductDetailsPage,
    ProductDetailsListComponent,
    ProductDetailsAddEditComponent
  ],
  providers: [
    ProductdetailPresentactionsheetComponent
  ]
})
export class ProductDetailsPageModule { }
