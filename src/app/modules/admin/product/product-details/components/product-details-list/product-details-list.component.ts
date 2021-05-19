import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { UrlConstant } from 'src/app/constants/url.constants';
import { ProductDetail, ProductDetailResponse } from 'src/app/models/product-details.model';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.scss'],
})
export class ProductDetailsListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mySearchBar', { static: true }) searchbar: IonSearchbar;

  dataSource: MatTableDataSource<ProductDetail>;
  resultsLength = 0;


  isLoadingResults = false;
  filterBy = '';
  filterID = '';

  columnsToDisplay = ['name', 'action'];

  constructor(
    private _pdService: ProductDetailService,
    private _navCtrl: NavController,
    private _actionService: ActionSheetUtilService
  ) { }

  async ngOnInit() {
    this.serverSideRender();
  }

  async presentActionSheet(element: ProductDetail) {
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
              UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_EDIT + '/' + element.id
            );
          },
        },
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
      UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_ADD);
  }

  onView(id: string) {
    this._navCtrl.navigateForward(
      `${UrlConstant.URL_ADMIN_PRODUCTS_DETAILS}/${id}`);
  }

  private serverSideRender() {
    const formEventSub = this.searchbar.ionChange
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          // this.paginator.pageIndex = 0;
          this.fetchAllProductDetails();
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
          this.fetchAllProductDetails();
        })
      )
      .subscribe();

  }

  private async fetchAllProductDetails() {
    this.isLoadingResults = true;
    try {
      const pdResponse: ProductDetailResponse = await this._pdService.getProductDetailAllWithPagination(
        this.searchbar.value,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.filterBy,
        this.filterID
      );

      this.dataSource = new MatTableDataSource(pdResponse.productDetails);
      this.resultsLength = pdResponse.totalCount;

      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }

}
