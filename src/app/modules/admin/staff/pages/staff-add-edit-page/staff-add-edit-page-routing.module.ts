import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffAddEditPagePage } from './staff-add-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: StaffAddEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffAddEditPagePageRoutingModule {}
