import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { UrlConstant } from 'src/app/constants/url.constants';
import { Customer, CustomerResponse } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mySearchBar', { static: true }) searchbar: IonSearchbar;

  customerDataSource: MatTableDataSource<Customer>;
  resultsLength = 0;

  columnsToDisplay = ['companyName', 'action'];
  // columnsToDisplay = ['companyName', 'pendingAmt', 'action',]; // Todo: will enable pending amount once payment API is done
  // columnsToDisplay = ['checkbox','companyName', 'phoneNumber', 'action']; // -- future scope -checkbox
  // private paymentTotal: IPaymentTotalResponse;

  constructor(
    private _customerService: CustomerService,
    private _navCtrl: NavController,
    private _actionService: ActionSheetUtilService
  ) { }

  async ngOnInit() {
    this.serverSideRender();
  }

  async presentActionSheet(element: Customer) {
    const actionSheet = await this._actionService.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'Add Payment',
          icon: 'cash-outline',
          cssClass: 'action-sheet-google',
          handler: () => {
            // this.updateAmountAlert(element);
          }
        },
        {
          text: 'View Customer',
          icon: 'person-outline',
          cssClass: 'action-sheet-secondary',
          handler: () => {
            this.onView(element.id);
          }
        },
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateForward(
              UrlConstant.URL_ADMIN_CUSTOMER + UrlConstant.URL_EDIT + '/' + element.id
            );
          },
        },
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   icon: 'trash',
        //   handler: () => {
        //     this.deleteAlert(element.id);
        //   }
        // },
        {
          text: 'Close',
          icon: 'close',
          cssClass: 'action-sheet-danger',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
  }
  onAdd() {
    this._navCtrl.navigateForward(
      UrlConstant.URL_ADMIN_CUSTOMER + UrlConstant.URL_ADD);
  }

  onView(id: string) {
    this._navCtrl.navigateForward(
      `${UrlConstant.URL_ADMIN_CUSTOMER}/${id}`);
  }

  private serverSideRender() {
    const formEventSub = this.searchbar.ionChange
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          // this.paginator.pageIndex = 0;
          this.fetchAllCustomers();
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
          this.fetchAllCustomers();
        })
      )
      .subscribe();

    // this.custDetailsSub.push(formEventSub);
    // this.custDetailsSub.push(sortChangeSub);
    // this.custDetailsSub.push(mergeSub);
  }

  private async fetchAllCustomers() {
    const customerList: CustomerResponse = await this._customerService.getCustomerAllWithPagination(
      this.searchbar.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    this.customerDataSource = new MatTableDataSource(customerList.customers);
    this.resultsLength = customerList.totalCount;
  }

}
