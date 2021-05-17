import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { ProductBrand } from 'src/app/models/product-brand.model';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.page.html',
  styleUrls: ['./product-brand.page.scss'],
})
export class ProductBrandPage implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  headerModel = new HeaderModel(AppConstant.PRODUCT_BRAND, true, UrlConstant.URL_ADMIN_PRODUCTS_BRAND);

  dataSource: MatTableDataSource<ProductBrand>;
  resultsLength = 0;
  isLoadingResults = false;

  columnsToDisplay: string[] = ['name', 'description', 'action'];

  constructor(
    private _pdService: ProductBrandService,
    private _navCtrl: NavController,
    private _actionService: ActionSheetUtilService
  ) { }

  async ngOnInit() {
  }

  ionViewWillEnter() {
    this.fetchAllProductBrand();
  }

  async presentActionSheet(element: ProductBrand) {
    const actionSheet = await this._actionService.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateForward(
              UrlConstant.URL_ADMIN_PRODUCTS_BRAND + UrlConstant.URL_EDIT + '/' + element.id,
              { skipLocationChange: true }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    this._navCtrl.navigateForward(
      UrlConstant.URL_ADMIN_PRODUCTS_BRAND + UrlConstant.URL_ADD,
      // { skipLocationChange: true }
    );
  }

  private async fetchAllProductBrand() {
    this.isLoadingResults = true;

    try {
      const pcList: ProductBrand[] = await this._pdService.getProductBrandAll();

      this.dataSource = new MatTableDataSource(pcList);
      this.resultsLength = pcList.length;
      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }


}
