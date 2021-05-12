import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAddEditPagePage } from './customer-add-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerAddEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAddEditPagePageRoutingModule {}
