import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/enum/user-role.enum';
import { AuthGuard } from '../auth/auth.guard';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) => m.SettingsPageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [UserRole.ADMIN, UserRole.STAFF] },
  // },
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
export class AdminPageRoutingModule {}
