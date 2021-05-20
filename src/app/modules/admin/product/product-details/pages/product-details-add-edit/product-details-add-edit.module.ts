import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsAddEditPageRoutingModule } from './product-details-add-edit-routing.module';

import { ProductDetailsAddEditPage } from './product-details-add-edit.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProductDetailsAddEditComponent } from '../../components/product-details-add-edit/product-details-add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsAddEditPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductDetailsAddEditPage,
    ProductDetailsAddEditComponent
  ]
})
export class ProductDetailsAddEditPageModule { }
