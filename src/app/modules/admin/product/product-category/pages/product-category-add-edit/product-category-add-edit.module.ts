import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryAddEditPageRoutingModule } from './product-category-add-edit-routing.module';

import { ProductCategoryAddEditPage } from './product-category-add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryAddEditPageRoutingModule
  ],
  declarations: [ProductCategoryAddEditPage]
})
export class ProductCategoryAddEditPageModule {}
