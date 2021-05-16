
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { LoginModel } from 'src/app/models/auth/login.model';
import { LoginResponse } from 'src/app/models/auth/loginResponse.model';
import { LoginOAuthModel } from 'src/app/models/auth/loginOAuth.model';
import { UrlConstant } from 'src/app/constants/url.constants';
import { UserRole } from 'src/app/enum/user-role.enum';
import { AppConstant } from 'src/app/constants/app.constants';
import { ApiUrlContant } from 'src/app/constants/api-url.constants';
import { HttpUtilService } from '../http/http-util.service';
import { HttpMethods } from 'src/app/models/http';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {

  private activeLogoutTimer: any;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _storage: Storage,
    private _cacheService: CacheService,
    private _httpUtilService: HttpUtilService
  ) {
    this._storage.create();
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {

  }

  get userIsAuthenticated() {
    return this._cacheService.authDetails.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userRole() {
    return this._cacheService.authDetails.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.role;
        } else {
          return null;
        }
      })
    );
  }

  get userName() {
    return this._cacheService.authDetails.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userName;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._cacheService.authDetails.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  async getToken() {
    const data = await this._storage.get(AppConstant.AUTH_DATA_STORAGE);
    if (data) {
      return JSON.parse(data)._token;
    }
  }

  autoLogin() {
    return from(this._storage.get(AppConstant.AUTH_DATA_STORAGE)).pipe(
      map((storedData) => {
        if (!storedData) {
          return null;
        }
        const parsedData = JSON.parse(storedData) as {
          _token: string;
          tokenExpirationDate: string;
          userName: string;
          role: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const authDetails = new AuthModel(
          parsedData.userName,
          parsedData._token,
          expirationTime,
          parsedData.role
        );
        return authDetails;
      }),
      tap((authDetails) => {
        if (authDetails) {
          this._cacheService.authDetails.next(authDetails);
          this.autoLogout(authDetails.tokenDuration);
        }
      }),
      map((authDetails) => !!authDetails)
    );
  }

  loginService(loginForm: LoginModel) {
    return from(this._httpUtilService.makeRequest(
      ApiUrlContant.LOGIN,
      HttpMethods.POST,
      { loginId: loginForm.userName, password: loginForm.password },
      null,
      null,
      { excludeAuthHeader: true }
    )).pipe(tap(this.setAuthData.bind(this)));;
  }

  loginOAuthService(loginOAuthForm: LoginOAuthModel) {
    return from(this._httpUtilService.makeRequest(
      `${ApiUrlContant.LOGIN}/oauth`,
      HttpMethods.POST,
      loginOAuthForm,
      null,
      null,
      { excludeAuthHeader: true }
    )).pipe(tap(this.setAuthData.bind(this)));
  }

  userRoleNavigation() {
    this.autoLogin().subscribe();
    this.userRole.subscribe(
      (userLocal) => {
        if (userLocal) {
          // const userLocal = JSON.parse(user);
          if (userLocal === UserRole.ADMIN || userLocal === UserRole.STAFF) {
            this._router.navigateByUrl(UrlConstant.URL_ADMIN_DASHBOARD);
          } else if (userLocal === UserRole.CUSTOMER) {
            this._router.navigateByUrl(UrlConstant.URL_CUSTOMER_DASHBOARD);
          }
        }
      });
  }


  async logOutService() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    await this._cacheService.authDetails.next(null);
    this._storage.remove(AppConstant.AUTH_DATA_STORAGE);
  }

  private setAuthData(loginResponse: LoginResponse) {
    const authData = new AuthModel(
      loginResponse.userId,
      loginResponse.idToken,
      new Date(loginResponse.expiresIn),
      loginResponse.role
    );
    this._cacheService.authDetails.next(authData);
    this.storeAuthData(authData);
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logOutService();
    }, duration);
  }

  private storeAuthData(authData: AuthModel) {
    this._storage.set(AppConstant.AUTH_DATA_STORAGE, JSON.stringify(authData));
  }

  private checkIsEmailPresent(email: string, providerId: string): Observable<LoginOAuthModel> {
    // return this._http.get<LoginOAuthModel>(`${ApiUrlContant.LOGIN}checkIsEmailPresent`,
    //   {
    //     params: new HttpParams()
    //       .set('email', email)
    //       .set('providerId', providerId)
    //   })
    //   .pipe(take(1));


    const params = new HttpParams()
      .set('email', email)
      .set('providerId', providerId);

    return from(this._httpUtilService.makeRequest(
      `${ApiUrlContant.LOGIN}/checkIsEmailPresent`,
      HttpMethods.POST,
      null,
      params,
      null,
      { excludeAuthHeader: false }
    )).pipe(tap(this.setAuthData.bind(this)));

  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
