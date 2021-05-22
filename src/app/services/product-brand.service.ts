import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { ProductBrand } from '../models/product-brand.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable()
export class ProductBrandService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getProductBrandAll(): Promise<ProductBrand[]> {
    return await this._http.makeRequest(
      ApiUrlContant.PRODUCT_BRAND,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async getProductBrandById(id: string): Promise<ProductBrand> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_BRAND}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveProductBrand(staff: ProductBrand): Promise<ProductBrand> {
    return await this._http.makeRequest(
      ApiUrlContant.PRODUCT_BRAND,
      HttpMethods.POST,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateProductBrand(id: string, staff: ProductBrand): Promise<ProductBrand> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_BRAND}/${id}`,
      HttpMethods.PUT,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteProductBrand(id: string): Promise<ProductBrand> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_BRAND}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
