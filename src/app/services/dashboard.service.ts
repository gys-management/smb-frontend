import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { AppConstant } from '../constants/app.constants';
import { DashboardCounts } from '../models/dashboard.model';
import { HttpMethods } from '../models/http';
import { TopSellerProductsChartData } from '../models/topSellerProductsChartData.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpUtilService
  ) { }


  async fetchTopSellingProductsChartData(
    startDate: string = '',
    endDate: string = '',
    count: number = AppConstant.TOP_SELLING_PRODUCT_DEFAULT_COUNT,
  ): Promise<TopSellerProductsChartData> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('count', count.toString());

    return await this._http.makeRequest(
      `${ApiUrlContant.PRODUCT_CHART}/top-sellers`,
      HttpMethods.GET,
      null,
      params,
      null,
      { hideSpinner: true }
    );

  }

  async getDashboardOverAllCount(): Promise<DashboardCounts> {
    return await this._http.makeRequest(
      `${ApiUrlContant.DASHBOARDS}/count`,
      HttpMethods.GET,
      null,
      null,
      null,
      { hideSpinner: true }
    );
  }
}
