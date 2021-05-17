import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductBrandPageRoutingModule } from './product-brand-routing.module';

import { ProductBrandPage } from './product-brand.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductBrandService } from 'src/app/services/product-brand.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductBrandPageRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule
  ],
  declarations: [ProductBrandPage],
  providers: [ProductBrandService]
})
export class ProductBrandPageModule { }
