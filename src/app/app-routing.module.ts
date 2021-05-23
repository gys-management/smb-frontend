import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InternetIssueComponent } from './common/internet-issue/internet-issue.component';

const routes: Routes = [
  {
    path: 'internet-error',
    component: InternetIssueComponent
  },
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
