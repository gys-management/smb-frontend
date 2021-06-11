import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from '../../shared/shared.module';
import { ProductGraphsComponent } from './components/product-graphs/product-graphs.component';
import { OrderService } from 'src/app/services/order.service';
import { ChartsModule } from 'ng2-charts';
import { CountUpModule } from 'ngx-countup';
import { DashboardCountAllComponent } from './components/dashboard-count-all/dashboard-count-all.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    ChartsModule,
    CountUpModule,
  ],
  declarations: [
    DashboardPage,
    ProductGraphsComponent,
    DashboardCountAllComponent
  ],
  providers: [
    OrderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule { }
