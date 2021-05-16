import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffViewPagePage } from './staff-view-page.page';

const routes: Routes = [
  {
    path: '',
    component: StaffViewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffViewPagePageRoutingModule {}
