import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage],
  providers: [ProductDetailService, ProductBrandService, ProductCategoryService]
})
export class ProductPageModule { }
