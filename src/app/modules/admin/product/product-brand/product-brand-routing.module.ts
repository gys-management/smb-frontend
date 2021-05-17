import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBrandPage } from './product-brand.page';

const routes: Routes = [
  {
    path: '',
    component: ProductBrandPage
  },
  {
    path: 'product-brand-add-edit',
    loadChildren: () => import('./pages/product-brand-add-edit/product-brand-add-edit.module').then( m => m.ProductBrandAddEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductBrandPageRoutingModule {}
