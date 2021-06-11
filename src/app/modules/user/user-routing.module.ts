import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/enum/user-role.enum';
import { AuthGuard } from '../auth/auth.guard';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.CUSTOMER] }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
