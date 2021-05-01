import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of, Observable } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { UrlConstant } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class UserUtilService {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  userAuthenticationUtil(route: ActivatedRouteSnapshot) {
    return this._authService.userIsAuthenticated.pipe(
      take(1),
      switchMap((isAuth) => {
        // Check user is already logged in
        if (!isAuth) {
          // call auto login
          return this._authService.autoLogin();
        }
        else {
          return of(isAuth);
        }
      }),
      map((isAuth) => {
        if (!isAuth) {
          // If user is not authenticated logout
          this._router.navigateByUrl(UrlConstant.URL_LOGIN);
        }
        else {
          this.userAuthorizationUtil(route.data.roles).subscribe(result => {
            isAuth = result;
            if (!result) {
              // If user is not authorized redirect to home page
              // this._router.navigateByUrl('/');
            }
          });
        }
        return isAuth;
      })
    );
  }

  userAuthorizationUtil(rolesList): Observable<boolean> {
    return this._authService.userRole.pipe(
      take(1),
      map(role => {
        // console.log(role);
        if (role === undefined) {
          // console.log('Role is not defined');
          this._router.navigateByUrl(UrlConstant.URL_LOGIN);
        }
        else if (role && rolesList && !rolesList.includes(role)) { // check if route is restricted by role
          // role not authorised so redirect to home page
          // console.log('User is not authenticated to view this');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
