import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  },
  {
    path: 'customer-add-edit-page',
    loadChildren: () => import('./pages/customer-add-edit-page/customer-add-edit-page.module').then(m => m.CustomerAddEditPagePageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/customer-view-page/customer-view-page.module').then(m => m.CustomerViewPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule { }
