import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'a',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'u',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'internet-error',
    loadChildren: () => import('./common/page/internet-issue/internet-issue.module').then(m => m.InternetIssuePageModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
