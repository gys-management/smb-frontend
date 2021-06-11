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
import { ProductdetailPresentactionsheetComponent } from '../productdetail-presentactionsheet/productdetail-presentactionsheet.component';

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

  columnsToDisplay = ['name', 'quantity', 'sellingPrice', 'action'];

  constructor(
    private _pdService: ProductDetailService,
    private _navCtrl: NavController,
    private _productdetailPresentActionSheetComp: ProductdetailPresentactionsheetComponent
  ) { }

  async ngOnInit() {
    this.serverSideRender();
  }

  async presentActionSheet(element: ProductDetail) {
    this._productdetailPresentActionSheetComp.presentActionSheet(element);
    const updateQuantitySub = this._productdetailPresentActionSheetComp.updateProductDetailsView.subscribe(
      res => {
        if (res) {
          this.fetchAllProductDetails();
          // to avoid multiple api calls on each time triggring event, unsubscribe it.
          updateQuantitySub.unsubscribe();
        }
      });
  }

  onAdd() {
    this._navCtrl.navigateRoot(
      UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_ADD);
  }

  onView(id: string) {
    this._navCtrl.navigateRoot(
      `${UrlConstant.URL_ADMIN_PRODUCTS_DETAILS}/${id}`);
  }


  serverSideRender() {
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

  async fetchAllProductDetails() {
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

      const prodDetailList = await this.qtyDisplayColorMethod(pdResponse.productDetails);

      this.dataSource = new MatTableDataSource(prodDetailList);
      this.resultsLength = pdResponse.totalCount;

      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }


  async qtyDisplayColorMethod(prodDetailList: ProductDetail[]): Promise<ProductDetail[]> {
    prodDetailList.map((prodDetail) => {
      if (prodDetail.quantity <= 0) {
        prodDetail.qtyDisplayColor = 'danger';
      } else if (prodDetail.quantity <= prodDetail.lowStockCount) {
        prodDetail.qtyDisplayColor = 'warning';
      } else {
        prodDetail.qtyDisplayColor = '';
      }
    });

    return prodDetailList;
  }

}
