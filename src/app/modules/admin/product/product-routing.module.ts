import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsPage } from './product-details/product-details.page';

import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: 'brand',
    loadChildren: () => import('./product-brand/product-brand.module').then(m => m.ProductBrandPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule { }
