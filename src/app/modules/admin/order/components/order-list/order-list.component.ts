import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { OrderStatus } from 'src/app/enum/order-status.enum';
import { Order } from 'src/app/models/order.model';
import { Payment } from 'src/app/models/payments/payment.model';
import { PaymentAddComponent } from 'src/app/modules/shared/payment/payment-add/payment-add.component';
import { OrderService } from 'src/app/services/order.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mySearchBar', { static: true }) searchbar: IonSearchbar;


  dataSource: MatTableDataSource<Order>;

  columnsToDisplay: string[] = [
    'orderNumber',
    'companyName',
    'finalAmount',
    'amountPaid',
    'orderedDate',
    'orderStatus',
    'action'];
  isLoadingResults = false;
  resultsLength = 0;

  constructor(
    private _navCtrl: NavController,
    private _orderService: OrderService,
    private _actionService: ActionSheetUtilService,
    private _alertCtrl: AlertUtilService,
    private _msgService: MessageService,
    private _modalService: ModalUtilService
  ) { }

  ngOnInit() {
    this.serverSideRender();
  }

  async fetchAllOrders() {
    this.isLoadingResults = true;

    try {
      const result = await this._orderService.getAllOrdersWithPagination(
        this.searchbar.value,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
      this.dataSource = new MatTableDataSource(result.responseDataList);
      this.resultsLength = result.totalCount;
      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }

  serverSideRender() {
    const formEventSub = this.searchbar.ionChange
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          // this.paginator.pageIndex = 0;
          this.fetchAllOrders();
        })
      )
      .subscribe();

    // If the user changes the sort order, reset back to the first page.
    const sortChangeSub = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );

    const mergeSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(() => { }),
        tap(() => {
          this.fetchAllOrders();
        })
      )
      .subscribe();
  }

  onView(id: string) {
    this._navCtrl.navigateRoot(
      `${UrlConstant.URL_ADMIN_ORDER}/${id}`);
  }

  async presentActionSheet(order: Order) {
    const buttons = this.actionSheetButtons(order);
    await this._actionService.presentActionSheet({
      header: 'Action',
      buttons,
    });
  }

  actionSheetButtons(order: Order) {
    const button = [];
    if (order.orderStatus === OrderStatus.ORDERED) {
      button.push(
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateRoot(UrlConstant.URL_ADMIN_ORDER + UrlConstant.URL_EDIT + '/' + order.id);
          },
        },
        {
          text: 'Completed Order',
          icon: 'trophy-outline',
          cssClass: 'action-sheet-success',
          handler: () => {
            this.completeOrderAlert(order.id);
          },
        },
        {
          text: 'Cancel Order',
          icon: 'trash-outline',
          cssClass: 'action-sheet-google',
          handler: () => {
            this.cancelOrderAlert(order.id);
          },
        });
    }

    if (order.orderStatus === OrderStatus.COMPLETED) {
      button.push({
        text: 'Paid',
        icon: 'cash-outline',
        cssClass: 'action-sheet-success',
        handler: () => {
          this.paidAmt(order);
        }
      });
    }

    // finally add close button
    button.push({
      text: 'Close',
      icon: 'close',
      cssClass: 'action-sheet-danger',
      role: 'cancel',
      handler: () => { }
    });
    return button;
  }

  async cancelOrderAlert(id) {
    await this._alertCtrl.presentAlert({
      header: 'Sure! Cancel the Order?',
      message: 'Since cancelling the order! consider paid amt is returned',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.cancelOrder(id);
          },
        },
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
  }


  async completeOrderAlert(id) {
    await this._alertCtrl.presentAlert({
      header: 'Sure! Complete the Order?',
      // message: 'Since cancelling the order! consider paid amt is returned',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.completeOrder(id);
          },
        },
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
  }

  async cancelOrder(id: string) {
    await this._orderService.cancelOrder(id);
    try {
      this.fetchAllOrders();
      this._msgService.messageSuccessToast(SuccessConstants.SUCCESS_ORDER_CANCEL);
    } catch (error) {
      this._msgService.messageErrorToast(error);
    }
  }


  async completeOrder(id: string) {
    await this._orderService.completedOrder(id);
    try {
      this.fetchAllOrders();
      this._msgService.messageSuccessToast(SuccessConstants.SUCCESS_ORDER_CANCEL);
    } catch (error) {
      this._msgService.messageErrorToast(error);
    }
  }

  async paidAmt(order: Order) {
    const result = await this._modalService.presentModalNew({
      component: PaymentAddComponent
    });
    if (result.role === AppConstant.CONFIRM_MODAL) {
      const paymentResult: Payment = result.data;

      order.amountPaid = paymentResult.amount;
      order.paymentMode = paymentResult.paymentMode;
      order.paymentReference = paymentResult.paymentReference;
      order.paymentDate = paymentResult.paymentDate;

      await this._orderService.payAmtForOrder(order.id, order);
      try {
        this.fetchAllOrders();
        this._msgService.messageSuccessToast(SuccessConstants.SUCCESS_ORDER_PAYMENT);
      } catch (error) {
        this._msgService.messageErrorToast(error);
      }
    }
  }

}


