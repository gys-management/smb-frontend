import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBrandAddEditPage } from './product-brand-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductBrandAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductBrandAddEditPageRoutingModule {}
