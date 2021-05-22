import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAddEditComponent } from './components/order-add-edit/order-add-edit.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { OrderPage } from './order.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  },
  {
    path: 'add',
    component: OrderAddEditComponent
  },
  {
    path: 'edit/:id',
    component: OrderAddEditComponent
  },
  {
    path: ':id',
    component: OrderViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule { }
