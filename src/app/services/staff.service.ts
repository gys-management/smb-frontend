import { Injectable } from '@angular/core';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { Staff } from '../models/staff.model';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private _http: HttpUtilService
  ) { }

  async getStaffAll(): Promise<Staff[]> {
    return await this._http.makeRequest(
      ApiUrlContant.STAFFS,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async getStaffById(id: string): Promise<Staff> {
    return await this._http.makeRequest(
      `${ApiUrlContant.STAFFS}/${id}`,
      HttpMethods.GET,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async saveStaff(staff: Staff): Promise<Staff> {
    return await this._http.makeRequest(
      ApiUrlContant.STAFFS,
      HttpMethods.POST,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async updateStaff(id: string, staff: Staff): Promise<Staff> {
    return await this._http.makeRequest(
      `${ApiUrlContant.STAFFS}/${id}`,
      HttpMethods.PUT,
      staff,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }

  async deleteStaff(id: string): Promise<Staff> {
    return await this._http.makeRequest(
      `${ApiUrlContant.STAFFS}/${id}`,
      HttpMethods.DELETE,
      null,
      null,
      null,
      { excludeAuthHeader: false }
    );
  }
}
