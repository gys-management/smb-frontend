import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductBrandPageRoutingModule } from './product-brand-routing.module';

import { ProductBrandPage } from './product-brand.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductBrandPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductBrandPage]
})
export class ProductBrandPageModule { }
