import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsAddEditComponent } from './components/product-details-add-edit/product-details-add-edit.component';

import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  },
  {
    path: 'add',
    component: ProductDetailsAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ProductDetailsAddEditComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsPageRoutingModule { }
