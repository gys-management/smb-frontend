import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerViewPagePage } from './customer-view-page.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerViewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerViewPagePageRoutingModule {}
