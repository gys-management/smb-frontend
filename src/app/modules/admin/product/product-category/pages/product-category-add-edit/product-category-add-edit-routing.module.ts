import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryAddEditPage } from './product-category-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryAddEditPageRoutingModule {}
