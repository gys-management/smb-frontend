import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { Organization } from '../models/organization.model';
import { CacheService } from './util/cache/cache.service';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private _http: HttpUtilService,
    private _cacheService: CacheService
  ) { }


  get getOrganizationById(): Observable<Organization> {
    return this._cacheService.organization.asObservable().pipe(
      tap(async (org) => {
        if (org) {
          return org;
        } else {
          this.fetchOrginzationById();
        }
      }));
  }

  async fetchOrginzationById(): Promise<void> {
    const resultOrg = await this._http.makeRequest(
      ApiUrlContant.ORGANIZATION,
      HttpMethods.GET,
      null, null, null,
      { excludeAuthHeader: false }
    );
    this._cacheService.organization.next(resultOrg);
    // return resultOrg;
  }
}
