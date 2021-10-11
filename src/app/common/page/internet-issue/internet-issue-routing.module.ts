import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternetIssuePage } from './internet-issue.page';

const routes: Routes = [
  {
    path: '',
    component: InternetIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternetIssuePageRoutingModule {}
