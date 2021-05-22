import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiUrlContant } from '../constants/api-url.constants';
import { OrderStatus } from '../enum/order-status.enum';
import { HttpMethods } from '../models/http';
import { Order } from '../models/order.model';
import { PaginatedResponse } from '../models/paginatedResponse.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable()
export class OrderService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getOrderAll(): Promise<Order[]> {
    return await this._http.makeRequest(
      ApiUrlContant.ORDERS,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  getAllOrdersWithPagination(
    filter: string = '',
    sortFiled: string = 'orderNumber',
    sortOrder: string = 'ASC',
    pageNumber: number = 0,
    pageSize: number = 10,
    orderStatus: OrderStatus = OrderStatus.ALL
  ): Promise<PaginatedResponse<Order>> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString())
      .set('sortby', sortFiled)
      .set('sortorder', sortOrder.toUpperCase())
      .set('searchterm', filter)
      .set('status', orderStatus);

    return this._http.makeRequest(
      `${ApiUrlContant.ORDERS}/page`,
      HttpMethods.GET,
      null,
      params
    );
  }

  async getOrderById(id: string): Promise<Order> {
    return await this._http.makeRequest(
      `${ApiUrlContant.ORDERS}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveOrder(order: Order): Promise<Order> {
    return await this._http.makeRequest(
      ApiUrlContant.ORDERS,
      HttpMethods.POST,
      order,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateOrder(id: string, order: Order): Promise<Order> {
    return await this._http.makeRequest(
      `${ApiUrlContant.ORDERS}/${id}`,
      HttpMethods.PUT,
      order,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteOrder(id: string): Promise<Order> {
    return await this._http.makeRequest(
      `${ApiUrlContant.ORDERS}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
