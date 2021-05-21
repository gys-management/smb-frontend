import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAddEditComponent } from './components/staff-add-edit/staff-add-edit.component';
import { StaffViewComponent } from './components/staff-view/staff-view.component';

import { StaffPage } from './staff.page';

const routes: Routes = [
  {
    path: '',
    component: StaffPage
  },
  {
    path: 'add',
    component: StaffAddEditComponent
  },
  {
    path: 'edit/:id',
    component: StaffAddEditComponent
  },
  {
    path: ':id',
    component: StaffViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPageRoutingModule { }
