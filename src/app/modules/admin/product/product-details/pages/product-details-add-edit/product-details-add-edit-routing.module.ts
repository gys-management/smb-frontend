import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsAddEditPage } from './product-details-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsAddEditPageRoutingModule {}
