import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffPage } from './staff.page';

const routes: Routes = [
  {
    path: '',
    component: StaffPage
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/staff-add-edit-page/staff-add-edit-page.module').then(m => m.StaffAddEditPagePageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/staff-add-edit-page/staff-add-edit-page.module').then(m => m.StaffAddEditPagePageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/staff-view-page/staff-view-page.module').then(m => m.StaffViewPagePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPageRoutingModule { }
