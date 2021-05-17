import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { ProductBrand } from 'src/app/models/product-brand.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MessageService } from 'src/app/services/util/messages/message.service';

@Component({
  selector: 'app-product-brand-add-edit',
  templateUrl: './product-brand-add-edit.page.html',
  styleUrls: ['./product-brand-add-edit.page.scss'],
})
export class ProductBrandAddEditPage implements OnInit {

  headerModel: HeaderModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY, false);
  form: FormGroup;
  productBrand = new ProductBrand();
  productCategoryList: ProductCategory[] = [];

  displayButtonText: string;
  isEdit = false;

  constructor(
    private _pbService: ProductBrandService,
    private _pcService: ProductCategoryService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.loadCustData();
  }

  async loadCustData() {

    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    const id = actived.get('id');

    if (!id) {
      this.isEdit = false;
      this.displayButtonText = AppConstant.SAVE;

      await this.fetchAllProductCategory();
      this.formControl();
      this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_BRAND, false);

    } else {
      this.isEdit = true;
      this.displayButtonText = AppConstant.UPDATE;
      this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_PRODUCTS_BRAND, false);

      this.loadProductBrandById(id);

    }
  }

  async onClick(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else if (!this.isEdit) {
      await this.onAdd();
    } else {
      await this.onUpdate();
    }
  }

  onCancel() {
    this._navCtrl.navigateBack(UrlConstant.URL_ADMIN_PRODUCTS_BRAND);
  }

  private async loadProductBrandById(id: string) {
    try {

      const result = await Promise.all([
        this._pbService.getProductBrandById(id),
        this._pcService.getProductCategoryAll()
      ]);
      this.productBrand = result[0];
      this.productCategoryList = result[1];

      // this.productBrand = await this._pbService.getProductBrandById(id);

      this.formControl();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private async fetchAllProductCategory() {
    try {
      this.productCategoryList = await this._pcService.getProductCategoryAll();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private formControl() {
    this.form = new FormGroup({
      name: new FormControl(this.productBrand.name, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl(this.productBrand.description, {
        updateOn: 'change',
      }),
      productCategoryId: new FormControl(this.productBrand.productCategoryId, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  private async onAdd(): Promise<void> {
    const record: ProductBrand = this.form.getRawValue();
    try {
      await this._pbService.saveProductBrand(record);
      const message = AppConstant.PRODUCT_BRAND + SuccessConstants.SUCCESS_SAVE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private async onUpdate(): Promise<void> {
    const record: ProductBrand = this.form.getRawValue();

    try {
      await this._pbService.updateProductBrand(this.productBrand.id, record);
      const message = AppConstant.PRODUCT_BRAND + SuccessConstants.SUCCESS_UPDATE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }
}
