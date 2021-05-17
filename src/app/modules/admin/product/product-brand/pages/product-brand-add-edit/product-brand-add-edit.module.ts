import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductBrandAddEditPageRoutingModule } from './product-brand-add-edit-routing.module';

import { ProductBrandAddEditPage } from './product-brand-add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductBrandAddEditPageRoutingModule
  ],
  declarations: [ProductBrandAddEditPage]
})
export class ProductBrandAddEditPageModule {}
