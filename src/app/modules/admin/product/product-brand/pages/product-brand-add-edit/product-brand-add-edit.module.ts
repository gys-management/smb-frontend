import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductBrandAddEditPageRoutingModule } from './product-brand-add-edit-routing.module';

import { ProductBrandAddEditPage } from './product-brand-add-edit.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductBrandAddEditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ProductBrandAddEditPage],
  providers: [ProductCategoryService, ProductBrandService]
})
export class ProductBrandAddEditPageModule { }
