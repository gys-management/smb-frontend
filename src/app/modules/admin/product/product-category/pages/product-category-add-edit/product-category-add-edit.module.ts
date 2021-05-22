import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryAddEditPageRoutingModule } from './product-category-add-edit-routing.module';

import { ProductCategoryAddEditPage } from './product-category-add-edit.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryAddEditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ProductCategoryAddEditPage],
  providers: [ProductCategoryService]
})
export class ProductCategoryAddEditPageModule { }
