import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { GST } from 'src/app/models/gst.model';
import { HeaderModel } from 'src/app/models/header.model';
import { ProductBrand } from 'src/app/models/product-brand.model';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductDetail } from 'src/app/models/product-details.model';
import { GstService } from 'src/app/services/gst.service';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-product-details-add-edit-comp',
  templateUrl: './product-details-add-edit.component.html',
  styleUrls: ['./product-details-add-edit.component.scss'],
})
export class ProductDetailsAddEditComponent implements OnInit {

  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_DETAILS, false);


  form: FormGroup;
  productDetail: ProductDetail;

  productCategoryListPage: ProductCategory[] = [];
  productBrandListPage: ProductBrand[] = [];
  productBrandListView: ProductBrand[] = [];
  gstList: GST[] = [];

  displayButtonText: string;
  isEdit = false;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pdService: ProductDetailService,
    private _pbService: ProductBrandService,
    private _pcService: ProductCategoryService,
    private _gstService: GstService,
    private _msgService: MessageService,
    private _navCtrl: NavController,
    private _modalService: ModalUtilService
  ) { }

  async ngOnInit() {
    await this.productCategoryData();
  }

  async productCategoryData() {

    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    const id = actived.get('id');

    if (!id) {
      this.productDetail = new ProductDetail();
      this.isEdit = false;
      this.displayButtonText = AppConstant.SAVE;

      this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_PRODUCTS_DETAILS, false);
      this.initilize(id);
    } else {
      this.isEdit = true;
      this.displayButtonText = AppConstant.UPDATE;
      this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_PRODUCTS_DETAILS, false);

      this.initilize(id);
    }
  }

  formControl() {
    this.form = new FormGroup({
      name: new FormControl(this.productDetail.name, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      hsnCode: new FormControl(this.productDetail.hsnCode, {
        updateOn: 'change'
      }),
      description: new FormControl(this.productDetail.description, {
        updateOn: 'change',
      }),
      productCategoryId: new FormControl(this.productDetail.productCategoryId, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      productBrandId: new FormControl(this.productDetail.productBrandId, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      buyingPrice: new FormControl(this.productDetail.buyingPrice, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      sellingPrice: new FormControl(this.productDetail.sellingPrice, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      basicPrice: new FormControl({ value: this.productDetail.basicPrice, disabled: true }),
      basicPriceTax: new FormControl({ value: this.productDetail.basicPriceTax, disabled: true }),
      gstIncluded: new FormControl(this.productDetail.gstIncluded, {
        updateOn: 'change'
      }),
      quantity: new FormControl(this.productDetail.quantity, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      discount: new FormControl(this.productDetail.discount, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      gstId: new FormControl(this.productDetail.gstId, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      lowStockCount: new FormControl(this.productDetail.lowStockCount, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onUpdateBuyingPrice() {
    this.form.get('sellingPrice').enable();
  }

  onPopulateBasicPrice() {
    const sellingPrice = this.form.get('sellingPrice').value;
    const gstId = this.form.get('gstId').value;
    const isGstIncluceCheckLoacl = this.form.get('gstIncluded').value;
    if (sellingPrice && gstId) {
      const gstDetails = this.gstList.find(gst => gst.id === gstId);
      if (isGstIncluceCheckLoacl) {
        /* Reference calculation
        Remove GST
        GST Amount = Original Cost – (Original Cost * (100 / (100 + GST% ) ) )
        Net Price = Original Cost – GST Amount
        */

        const gstAmountCalculation = +(sellingPrice - (sellingPrice * (100 / (100 + gstDetails.percentage)))).toFixed(2);
        const basicPrice = sellingPrice - gstAmountCalculation;
        this.form.get('basicPriceTax').patchValue(gstAmountCalculation);
        this.form.get('basicPrice').patchValue(basicPrice);
      } else {
        /* Reference calculation
        Add GST
       GST Amount = ( Original Cost * GST% ) / 100
       Net Price = Original Cost + GST Amount
         */
        const gstAmountCalculation = +((sellingPrice * gstDetails.percentage) / 100).toFixed(2);
        // const basicPrice = sellingPrice - gstAmountCalculation;
        this.form.get('basicPriceTax').patchValue(gstAmountCalculation);
        this.form.get('basicPrice').patchValue(sellingPrice);
      }
    }
  }


  applyProductCategory(value: string, intial: boolean) {
    this.form.get('productBrandId').reset();
    if (intial) {
      this.form
        .get('productBrandId')
        .patchValue(this.productDetail.productBrandId);
    }
    this.productBrandListView = [];
    const pbLocal = this.productBrandListPage;
    this.productBrandListView = pbLocal.filter((pb) => pb.productCategoryId.find((x) => x === value));
    if (this.productBrandListView.length > 0) {
      this.form.get('productBrandId').enable();
    } else {
      this._msgService.messageErrorAlert(null, ErrorConstant.ERR_BRAND_MAPPING_TO_CATEGORY);
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

  async onCancel() {
    // If component close the modal. else back to page
    const result = await this._modalService.isModalPresent();
    if (result !== undefined) {
      this._modalService.dismissPresentModal();
    } else {
      this._navCtrl.back();
    }
  }

  private async initilize(id: string) {
    const result = await Promise.all([
      this._pbService.getProductBrandAll(),
      this._pcService.getProductCategoryAll(),
      this._gstService.getGSTAll()
    ]);
    this.productBrandListPage = result[0];
    this.productCategoryListPage = result[1];
    this.gstList = result[2];

    if (this.isEdit) {
      this.productDetail = await this._pdService.getProductDetailById(id);
      this.formControl();

      this.applyProductCategory(this.productDetail.productCategoryId, true);
    } else {
      this.formControl();
    }

  }

  private async onAdd(): Promise<void> {
    const record: ProductDetail = this.form.getRawValue();
    try {
      await this._pdService.saveProductDetail(record);
      const message = AppConstant.PRODUCT + SuccessConstants.SUCCESS_SAVE;

      this._msgService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._msgService.messageErrorToast(error);
    }
  }

  private async onUpdate(): Promise<void> {
    const record: ProductDetail = this.form.getRawValue();

    try {
      await this._pdService.updateProductDetail(this.productDetail.id, record);
      const message = AppConstant.PRODUCT + SuccessConstants.SUCCESS_UPDATE;

      this._msgService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._msgService.messageErrorToast(error);
    }
  }
}
