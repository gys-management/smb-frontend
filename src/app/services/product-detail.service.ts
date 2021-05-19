import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { ProductDetail, ProductDetailResponse } from '../models/product-details.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable()
export class ProductDetailService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getProductDetailAllWithPagination(
    searchTerm = '',
    sortFiled = 'name',
    sortOrder = 'ASC',
    pageNumber = 0,
    pageSize = 10,
    filterBy = '',
    filterId = ''
  ): Promise<ProductDetailResponse> {
    const params: HttpParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sortby', sortFiled)
      .set('sortOrder', sortOrder.toUpperCase())
      .set('searchterm', searchTerm)
      .set('filterBy', filterBy)
      .set('filterId', filterId);

    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_DETAILS}/page`,
      HttpMethods.GET,
      null,
      params,
      null,
      { excludeAuthHeader: false }
    );
  }

  async getProductDetailById(id: string): Promise<ProductDetail> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_DETAILS}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveProductDetail(staff: ProductDetail): Promise<ProductDetail> {
    return await this._http.makeRequest(
      ApiUrlContant.PRODUCT_DETAILS,
      HttpMethods.POST,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateProductDetail(id: string, staff: ProductDetail): Promise<ProductDetail> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_DETAILS}/${id}`,
      HttpMethods.PUT,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteProductDetail(id: string): Promise<ProductDetail> {
    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_DETAILS}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
