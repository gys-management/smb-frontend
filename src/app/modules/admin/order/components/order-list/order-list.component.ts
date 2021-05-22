import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar } from '@ionic/angular';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

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
    private _orderService: OrderService
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

  async presentActionSheet(element: Order) {

  }

  private serverSideRender() {
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


}


