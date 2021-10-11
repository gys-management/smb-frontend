import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAddEditComponent } from './components/customer-add-edit/customer-add-edit.component';
import { CustomerViewComponent } from './components/customer-view/customer-view.component';

import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  },
  {
    path: 'add',
    component: CustomerAddEditComponent,
  },
  {
    path: 'edit/:id',
    component: CustomerAddEditComponent
  },
  {
    path: ':id',
    component: CustomerViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule { }
