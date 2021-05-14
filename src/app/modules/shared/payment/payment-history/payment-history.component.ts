import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { merge, Subscription } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { PaymentStatus } from 'src/app/enum/paymen.enum';
import { HeaderModel } from 'src/app/models/header.model';
import { Payment } from 'src/app/models/payments/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {
  @Input() customerId: string;
  @Input() paymentHistoryListOrderDetailPage: Payment[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  headerModel = new HeaderModel(AppConstant.PAYMENT, false, null, true);

  paymentListSub: Subscription[] = [];

  paymentStatusLocal = PaymentStatus;
  isLoadingResults = false;


  displayedColumns: string[] = [
    'paymentMode',
    'amount',
    'paymentStatus',
    'createdDate',
    'paymentReference'
  ];
  paymentHistoryDataSource: MatTableDataSource<Payment>;
  dataLength: number;

  searchbar = '';

  constructor(
    private _modalController: ModalController,
    private _paymentService: PaymentService,
  ) { }

  ngOnInit() {
    if (this.paymentHistoryListOrderDetailPage &&
      this.paymentHistoryListOrderDetailPage.length !== 0) {
      // load payment history for order detail page
      this.loadPaymentHistoryForOrderDetailPage();
    } else {
      // pagniation only for customer detail page payment history
      this.serverSideRender();
    }
  }

  serverSideRender() {

    // If the user changes the sort order, reset back to the first page.
    const sortChangeSub = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );

    const mergeSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(() => { }),
        tap(() => {
          this.loadPaymentHistoryForCustomerDetailPage();
        })
      )
      .subscribe();

    this.paymentListSub.push(sortChangeSub);
    this.paymentListSub.push(mergeSub);
  }

  loadPaymentHistoryForOrderDetailPage() {
    this.paymentHistoryDataSource = new MatTableDataSource(this.paymentHistoryListOrderDetailPage);
    this.dataLength = this.paymentHistoryListOrderDetailPage.length;
  }


  loadPaymentHistoryForCustomerDetailPage() {
    this.isLoadingResults = true;
    this._paymentService.getPaymentHistoryByCustomerId(
      this.customerId,
      this.searchbar,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    ).then(paymentHistory => {
      this.paymentHistoryDataSource = new MatTableDataSource(paymentHistory.responseDataList);
      this.dataLength = paymentHistory.totalCount;
      this.isLoadingResults = false;
    });

  }

  cancel() {
    this._modalController.dismiss(null, 'cancel');
  }

  ngOnDestroy() {
    this.paymentListSub.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}

