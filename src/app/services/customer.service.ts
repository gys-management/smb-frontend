import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { Customer, CustomerResponse } from '../models/customer.model';
import { HttpMethods } from '../models/http';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpUtilService: HttpUtilService) { }


  async getCustomerAll(): Promise<Customer[]> {
    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER,
      HttpMethods.GET);
  }

  async getCustomerAllWithPagination(
    filter = '',
    sortFiled = 'companyName',
    sortOrder = 'ASC',
    pageNumber = 0,
    pageSize = 10
  ): Promise<CustomerResponse> {
    const params: HttpParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sortby', sortFiled)
      .set('sortorder', sortOrder.toUpperCase())
      .set('searchterm', filter);

    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER,
      HttpMethods.GET,
      null,
      params
    );
  }

  async getCustomerById(custId: string): Promise<Customer> {
    return await this._httpUtilService.makeRequest(
      `${ApiUrlContant.CUSTOMER}/${custId}`,
      HttpMethods.GET
    );
  }

  async addCustomer(cust: Customer): Promise<Customer> {
    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER,
      HttpMethods.POST,
      cust
    );
  }

  async updateCustomer(updateCust: Customer): Promise<Customer> {
    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER + updateCust.id,
      HttpMethods.PUT,
      updateCust
    );
  }

  async deleteCustomer(custId: string): Promise<Customer> {
    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER + custId,
      HttpMethods.DELETE
    );
  }

  async fetchCustomerCount(): Promise<number> {
    return await this._httpUtilService.makeRequest(
      ApiUrlContant.CUSTOMER + 'count',
      HttpMethods.GET
    );
  }
}
