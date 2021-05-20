import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/product-details-add-edit/product-details-add-edit.module')
      .then(m => m.ProductDetailsAddEditPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/product-details-add-edit/product-details-add-edit.module')
      .then(m => m.ProductDetailsAddEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsPageRoutingModule { }
