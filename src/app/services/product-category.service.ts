import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { ProductCategory } from '../models/product-category.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable()
export class ProductCategoryService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getProductCategoryAll(): Promise<ProductCategory[]> {
    return await this._http.makeRequest(
      ApiUrlContant.PRODUCT_CATEGORY,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async getProductCategoryById(id: string): Promise<ProductCategory> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_CATEGORY}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveProductCategory(staff: ProductCategory): Promise<ProductCategory> {
    return await this._http.makeRequest(
      ApiUrlContant.PRODUCT_CATEGORY,
      HttpMethods.POST,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateProductCategory(id: string, staff: ProductCategory): Promise<ProductCategory> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_CATEGORY}/${id}`,
      HttpMethods.PUT,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteProductCategory(id: string): Promise<ProductCategory> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_CATEGORY}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
