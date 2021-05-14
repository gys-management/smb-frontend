import { Injectable } from '@angular/core';
import { HttpUtilService } from './util/http/http-util.service';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { HttpParams } from '@angular/common/http';
import { Payment, PaymentTotalResponse } from '../models/payments/payment.model';
import { PaginatedResponse } from '../models/paginatedResponse.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _httpUtilService: HttpUtilService) { }

  async getTotalPaymentByCustomerId(custId: string): Promise<PaymentTotalResponse> {
    return await this._httpUtilService.makeRequest(
      `${ApiUrlContant.PAYMENT}/totalPayment/customer/${custId}`,
      HttpMethods.GET);
  }

  async getPaymentHistoryByCustomerId(
    customerId: string,
    filter: string = '',
    sortFiled: string = 'orderNumber',
    sortOrder: string = 'ASC',
    pageNumber: number = 0,
    pageSize: number = 5,
  ): Promise<PaginatedResponse<Payment>> {
    const params: HttpParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sortby', sortFiled)
      .set('sortorder', sortOrder.toUpperCase())
      .set('searchterm', filter);

    return await this._httpUtilService.makeRequest(
      `${ApiUrlContant.PAYMENT}/customer/${customerId}`,
      HttpMethods.GET,
      null,
      params,
      null,
      { hideSpinner: true }
    );
  }
}
