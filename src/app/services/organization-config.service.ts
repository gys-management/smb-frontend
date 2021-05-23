import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiUrlContant } from '../constants/api-url.constants';
import { HttpMethods } from '../models/http';
import { OrganizationConfig } from '../models/order.model';
import { CacheService } from './util/cache/cache.service';
import { HttpUtilService } from './util/http/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationConfigService {

  constructor(
    private _http: HttpUtilService,
    private _cacheService: CacheService
  ) { }


  get getOrganizationConfig(): Observable<OrganizationConfig> {
    return this._cacheService.orgConfig.asObservable().pipe(
      tap(async (org) => {
        if (org) {
          return org;
        } else {
          this.fetchOrginzationConfigByOrgId().subscribe();
        }
      }));
  }

  fetchOrginzationConfigByOrgId(): Observable<OrganizationConfig> {
    return from(this._http.makeRequest(
      ApiUrlContant.ORG_CONFIG,
      HttpMethods.GET,
      null, null, null,
      { excludeAuthHeader: false, hideSpinner: true }
    )).pipe(
      map((resultOrg) => {
        this._cacheService.orgConfig.next(resultOrg);
        return resultOrg;
      })
    );
  }
}
