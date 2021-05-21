import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffPageRoutingModule } from './staff-routing.module';

import { StaffPage } from './staff.page';
import { SharedModule } from '../../shared/shared.module';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { StaffAddEditComponent } from './components/staff-add-edit/staff-add-edit.component';
import { StaffViewComponent } from './components/staff-view/staff-view.component';
import { StaffService } from 'src/app/services/staff.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffPageRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  declarations: [
    StaffPage,
    StaffListComponent,
    StaffAddEditComponent,
    StaffViewComponent
  ],
  providers: [StaffService]
})
export class StaffPageModule { }
