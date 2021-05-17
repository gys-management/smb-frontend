import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryPage } from './product-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryPage
  },
  {
    path: 'product-category-add-edit',
    loadChildren: () => import('./pages/product-category-add-edit/product-category-add-edit.module').then( m => m.ProductCategoryAddEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryPageRoutingModule {}
