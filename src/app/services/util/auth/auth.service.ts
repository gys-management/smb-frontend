
import { Injectable, OnInit, OnDestroy, NgZone } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { LoginModel } from 'src/app/models/auth/login.model';
import { LoginResponse } from 'src/app/models/auth/loginResponse.model';
import { LoginOAuthModel } from 'src/app/models/auth/loginOAuth.model';
import { LoginConstant } from 'src/app/constants/login.constants';
import { UrlConstants } from 'src/app/constants/url.constants';
import { UserRole } from 'src/app/enum/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  private AUTH_DATA_STORAGE = 'AuthDataStorage';
  private LOGIN_URL = '/login/';
  private HAS_LOGGED_IN = 'hasLoggedIn';
  private activeLogoutTimer: any;
  private authDetails = new BehaviorSubject<AuthModel>(null);
  private login: LoginModel;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    public storage: Storage
  ) {
    this.storage.set(this.HAS_LOGGED_IN, false);
  }

  private ngOnInit() {

  }

  get userIsAuthenticated() {
    return this.authDetails.asObservable().pipe(
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
    return this.authDetails.asObservable().pipe(
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
    return this.authDetails.asObservable().pipe(
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
    return this.authDetails.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: this.AUTH_DATA_STORAGE })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
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
          this.authDetails.next(authDetails);
          this.autoLogout(authDetails.tokenDuration);
        }
      }),
      map((authDetails) => {
        return !!authDetails;
      })
    );
  }

  loginService(loginForm: LoginModel) {
    return this._http
      .post<LoginResponse>(this.LOGIN_URL, {
        phoneNumber: loginForm.userName,
        password: loginForm.password,
      })
      .pipe(tap(this.setAuthData.bind(this)));
  }

  loginOAuthService(loginOAuthForm: LoginOAuthModel) {
    return this._http
      .post<LoginOAuthModel>(`${this.LOGIN_URL}oauth`, loginOAuthForm)
      .pipe(tap(this.setAuthData.bind(this)));
  }

  private setAuthData(loginResponse: LoginResponse) {
    const authData = new AuthModel(
      loginResponse.userId,
      loginResponse.idToken,
      new Date(loginResponse.expiresIn),
      loginResponse.role
    );
    this.authDetails.next(authData);
    this.storeAuthData(authData);
    this.userRoleNavigation();
  }

  private userRoleNavigation() {
    this.userRole.subscribe(
      (user) => {
        if (user) {
          const userLocal = JSON.parse(user);
          if (userLocal.role === UserRole.ADMIN || userLocal.role === UserRole.STAFF) {
            this._router.navigateByUrl(UrlConstants.URL_ADMIN_DASHBOARD);
          } else if (userLocal.role === UserRole.CUSTOMER) {
            this._router.navigateByUrl(UrlConstants.URL_CUSTOMER_DASHBOARD);
          }
        }
      });
  }

  private async logOutService() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    await this.authDetails.next(null);
    Plugins.Storage.remove({ key: this.AUTH_DATA_STORAGE });
    this.storage.set(this.HAS_LOGGED_IN, false);
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
    Plugins.Storage.set({
      key: this.AUTH_DATA_STORAGE,
      value: JSON.stringify(authData),
    });
    this.storage.set(this.HAS_LOGGED_IN, true);
  }

  private checkIsEmailPresent(email: string, providerId: string): Observable<LoginOAuthModel> {
    return this._http.get<LoginOAuthModel>(`${this.LOGIN_URL}checkIsEmailPresent`,
      {
        params: new HttpParams()
          .set('email', email)
          .set('providerId', providerId)
      })
      .pipe(take(1));
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
