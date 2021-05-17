import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { Staff } from 'src/app/models/staff.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  headerModel = new HeaderModel(AppConstant.PRODUCT_CATEGORY, true, UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY);

  dataSource: MatTableDataSource<ProductCategory>;
  resultsLength = 0;
  isLoadingResults = false;

  columnsToDisplay: string[] = ['name', 'description', 'action'];

  constructor(
    private _pcService: ProductCategoryService,
    private _navCtrl: NavController,
    private _actionService: ActionSheetUtilService
  ) { }

  async ngOnInit() {
    // this.fetchAllProductCategory();
  }

  ionViewWillEnter() {
    this.fetchAllProductCategory();
  }

  async presentActionSheet(element: Staff) {
    const actionSheet = await this._actionService.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateForward(
              UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY + UrlConstant.URL_EDIT + '/' + element.id);
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
      UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY + UrlConstant.URL_ADD);
  }

  private async fetchAllProductCategory() {
    this.isLoadingResults = true;

    try {
      const pcList: ProductCategory[] = await this._pcService.getProductCategoryAll();

      this.dataSource = new MatTableDataSource(pcList);
      this.resultsLength = pcList.length;
      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }

}
