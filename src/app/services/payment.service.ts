import { Injectable } from '@angular/core';
import { HttpUtilService } from './util/http/http-util.service';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { PaymentTotalResponse } from '../models/payments/paymentTotalResponse.model';


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
}
