import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetIssuePageRoutingModule } from './internet-issue-routing.module';

import { InternetIssuePage } from './internet-issue.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternetIssuePageRoutingModule,
    SharedModule
  ],
  declarations: [InternetIssuePage]
})
export class InternetIssuePageModule { }
