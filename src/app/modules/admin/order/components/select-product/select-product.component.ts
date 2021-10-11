import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/product-details.model';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductdetailPresentactionsheetComponent }
  from '../../../product/product-details/components/productdetail-presentactionsheet/productdetail-presentactionsheet.component';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';
import { ProductDetailsAddEditComponent }
  from '../../../product/product-details/components/product-details-add-edit/product-details-add-edit.component';
import { LoggerService } from 'src/app/services/util/logger/logger.service';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() pcIdEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedProductDetail: EventEmitter<ProductDetail[]> = new EventEmitter<ProductDetail[]>();
  @Input() deletedProductDetail: EventEmitter<ProductDetail> = new EventEmitter<ProductDetail>();
  @Output() productDetailSelectionChange: EventEmitter<IonicSelectableComponent> = new EventEmitter<IonicSelectableComponent>();

  @ViewChild('productDetailSelectable') productDetailSelectable: IonicSelectableComponent;


  pcId: string;
  productDetailList: ProductDetail[] = [];
  productDetail: ProductDetail;
  currentPage = 0;
  totalpage = 0;
  selectProductSub: Subscription[] = [];
  fetchCountPerPage = 20;
  displayIonicSelectable = false;

  constructor(
    private _productDetailService: ProductDetailService,
    private _navCtrl: NavController,
    private _productdetailPresentactionsheet: ProductdetailPresentactionsheetComponent,
    private _modalService: ModalUtilService
  ) { }
  ngOnInit() {
    // this.removeSelectedProductDetailFromListView(this.selectedProductDetail)

  }

  ngAfterViewInit(): void {
    this.addedProductDetailToProductDetailSelectable();
    this.removedProductDetailAddToProductDetailSelectable();
    this.getProductCategoryIDToFilter();
  }

  getProductCategoryIDToFilter() {
    this.pcIdEmitter.subscribe(id => {
      this.pcId = id;
      LoggerService.debug('getProductCategoryIDToFilter :: ', this.pcId);
    });
  }

  productDetailSelectableChange() {
    this.productDetailSelectionChange.emit(this.productDetailSelectable);
  }

  // Already selected (while editing) details should not show in product list
  addedProductDetailToProductDetailSelectable() {
    this.productDetailSelectable.value = []; // set the value as array
    const selectPdSub = this.selectedProductDetail.subscribe(pdlist => {
      if (pdlist.length > 0) {
        pdlist.forEach(element => {
          this.productDetailSelectable.value.push(element);
        });
      }
    });
    this.selectProductSub.push(selectPdSub);
  }

  // When user delete from orderItem list, then the product should visible in product detail list
  removedProductDetailAddToProductDetailSelectable() {
    const selectPdSub = this.deletedProductDetail.subscribe(pdLocal => {
      if (pdLocal) {
        this.productDetailSelectable.value = this.productDetailSelectable.value
          .filter((x) => x.id !== pdLocal.id);
      }
    });
    this.selectProductSub.push(selectPdSub);
  }

  // Once the productdetail is selected that should not show in product list
  removeSelectedProductDetailFromListView(productDetail) {
    if (this.productDetailSelectable && this.productDetailSelectable.value) {
      return this.productDetailSelectable.value.forEach((pdSelected: ProductDetail) => {
        productDetail.forEach((pdList: ProductDetail) => {
          if (pdSelected.id === pdList.id) {
            const index = productDetail.indexOf(pdList);
            productDetail.splice(index, 1);
          }
        });
      });
    }
  }

  updateSelectedProductDetailsFields(productDetail: ProductDetail[]) {
    const selectedItems = this.productDetailSelectable._selectedItems;
    selectedItems.forEach((pdSelected: ProductDetail) => {
      productDetail.forEach((pdList: ProductDetail) => {
        if (pdSelected.id === pdList.id) {
          const index = selectedItems.findIndex(x => x.id === pdList.id);
          selectedItems.splice(index, 1, pdList);
        }
      });
    });
  }

  async productDetailSelectableSearch(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    const searchText = event.text;
    event.component.startSearch();
    this.currentPage = 0;
    LoggerService.debug('productDetailSelectableSearch :: ', this.pcId);

    // filtered by company name from our server.
    const pd = await this._productDetailService
      .getProductDetailAllWithPagination(
        searchText,
        undefined,
        undefined,
        this.currentPage,
        this.fetchCountPerPage,
        AppConstant.PRODUCT_CATEGORY_STRING,
        this.pcId,
      );
    try {
      // this.customerList = cust.customers;
      this.removeSelectedProductDetailFromListView(pd.productDetails);

      event.component.items = pd.productDetails;
      this.totalpage = pd.totalCount / this.fetchCountPerPage;
      this.updateSelectedProductDetailsFields(event.component.items);

      event.component.endSearch();
      event.component.enableInfiniteScroll();
    } catch (error) {
      // Get product and stop searching.
      event.component.endSearch();
      event.component.enableInfiniteScroll();
    }

  }

  async getMoreProductDetail(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    this.currentPage++;

    const text = (event.text || '').trim().toLowerCase();
    // There're no more ports - disable infinite scroll.
    if (this.currentPage > this.totalpage) {
      event.component.disableInfiniteScroll();
      return;
    }

    if (text === '') {
      const pd = await this._productDetailService
        .getProductDetailAllWithPagination(
          undefined,
          undefined,
          undefined,
          this.currentPage,
          this.fetchCountPerPage,
          AppConstant.PRODUCT_CATEGORY_STRING,
          this.pcId
        );
      try {
        this.removeSelectedProductDetailFromListView(pd.productDetails);

        const localProductCount = event.component.items.concat(
          pd.productDetails
        );

        event.component.items = localProductCount;
        event.component.endInfiniteScroll();
      } catch (error) {
        event.component.endInfiniteScroll();
      }
    } else {
      event.component.endInfiniteScroll();
    }
  }

  updateQuantity(productDetail) {
    this._productdetailPresentactionsheet.updateQuantityAlert(productDetail);

    const updateQuantitySub = this._productdetailPresentactionsheet.updateProductDetailsView.subscribe(
      (res) => {
        if (res) {
          this.productDetailSelectableSearch({
            component: this.productDetailSelectable,
            text: ''
          });
          // to avoid multiple api calls on each time triggring event, unsubscribe it.
          updateQuantitySub.unsubscribe();
        }
      });

    this.selectProductSub.push(updateQuantitySub);
  }


  close() {
    this.productDetailSelectable.close();
  }

  async addProductsURL(event) {
    // this.productDetailSelectable.close();
    // this._navCtrl.navigateRoot(UrlConstant.URL_ADMIN_PRODUCTS_DETAILS + UrlConstant.URL_ADD);

    await this._modalService.presentModalNew({
      component: ProductDetailsAddEditComponent
    });
    this.productDetailSelectableSearch({ component: this.productDetailSelectable, text: '' });
  }

  ngOnDestroy() {
    this.selectProductSub.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

}
