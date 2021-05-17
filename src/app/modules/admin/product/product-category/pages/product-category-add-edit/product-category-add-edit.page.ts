import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MessageService } from 'src/app/services/util/messages/message.service';

@Component({
  selector: 'app-product-category-add-edit',
  templateUrl: './product-category-add-edit.page.html',
  styleUrls: ['./product-category-add-edit.page.scss'],
})
export class ProductCategoryAddEditPage implements OnInit {

  headerModel: HeaderModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY, false);
  form: FormGroup;
  productCategory = new ProductCategory();

  displayButtonText: string;
  isEdit = false;

  constructor(
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
    console.log(id);

    if (!id) {
      this.isEdit = false;
      this.displayButtonText = AppConstant.SAVE;

      this.formControl();
      this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY, false);

    } else {
      this.isEdit = true;
      this.displayButtonText = AppConstant.UPDATE;
      this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY, false);

      this.loadProductCategoryById(id);
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
    this._navCtrl.navigateBack(UrlConstant.URL_ADMIN_PRODUCTS_CATEGORY);
  }

  private async loadProductCategoryById(id: string) {
    try {
      this.productCategory = await this._pcService.getProductCategoryById(id);
      this.formControl();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private formControl() {
    this.form = new FormGroup({
      name: new FormControl(this.productCategory.name, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl(this.productCategory.description, {
        updateOn: 'change',
      })
    });
  }

  private async onAdd(): Promise<void> {
    const record: ProductCategory = this.form.getRawValue();
    try {
      await this._pcService.saveProductCategory(record);
      const message = AppConstant.PRODUCT_CATEGORY + SuccessConstants.SUCCESS_SAVE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private async onUpdate(): Promise<void> {
    const record: ProductCategory = this.form.getRawValue();

    try {
      await this._pcService.updateProductCategory(this.productCategory.id, record);
      const message = AppConstant.PRODUCT_CATEGORY + SuccessConstants.SUCCESS_UPDATE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

}
