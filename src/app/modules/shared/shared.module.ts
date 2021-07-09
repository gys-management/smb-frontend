import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentHistoryComponent } from './payment/payment-history/payment-history.component';
import { NoDataMessageComponent } from './no-data-message/no-data-message.component';
import { PaymentAddComponent } from './payment/payment-add/payment-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NoDataMessageComponent,
    PaymentHistoryComponent,
    PaymentAddComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTooltipModule,
    PipeModule
  ],
  exports: [
    HeaderComponent,
    NoDataMessageComponent,
    PaymentHistoryComponent,
    PaymentAddComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
