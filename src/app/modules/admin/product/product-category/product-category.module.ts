import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryPageRoutingModule } from './product-category-routing.module';

import { ProductCategoryPage } from './product-category.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryPageRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule
  ],
  declarations: [
    ProductCategoryPage
  ],
  providers: [ProductCategoryService]
})
export class ProductCategoryPageModule { }
