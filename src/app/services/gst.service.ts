import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { GST } from '../models/gst.model';
import { HttpMethods } from '../models/http';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class GstService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getGSTAll(): Promise<GST[]> {
    return await this._http.makeRequest(
      ApiUrlContant.GST,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async getGSTById(id: string): Promise<GST> {
    return await this._http.makeRequest(
      `${ApiUrlContant.GST}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveGST(gst: GST): Promise<GST> {
    return await this._http.makeRequest(
      ApiUrlContant.GST,
      HttpMethods.POST,
      gst,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateGST(id: string, gst: GST): Promise<GST> {
    return await this._http.makeRequest(
      `${ApiUrlContant.GST}/${id}`,
      HttpMethods.PUT,
      gst,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteGST(id: string): Promise<GST> {
    return await this._http.makeRequest(
      `${ApiUrlContant.GST}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
