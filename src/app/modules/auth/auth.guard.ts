import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserUtilService } from 'src/app/services/util/user/user-util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _userUtil: UserUtilService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._userUtil.userAuthenticationUtil(route);
  }


  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this._authService.userIsAuthenticated.pipe(
  //     take(1),
  //     switchMap((isAuth) => {
  //       if (!isAuth) {
  //         return this._authService.autoLogin();
  //       } else {
  //         return of(isAuth);
  //       }
  //     }),
  //     tap((isAuth) => {
  //       if (!isAuth) {
  //         this._router.navigateByUrl('/auth/login');
  //       }
  //     })
  //   );
  // }
}
