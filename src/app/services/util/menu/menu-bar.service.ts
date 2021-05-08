import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuBarConstants } from 'src/app/constants/menu-bar-constants';
import { UserRole } from 'src/app/enum/user-role.enum';
import { AuthService } from '../auth/auth.service';
import { UserUtilService } from '../user/user-util.service';

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {

  constructor(
    private _authService: AuthService
  ) { }

  menuBar() {
    return this._authService.userRole.pipe(
      map(userRole => {
        if (userRole === UserRole.CUSTOMER) {
          return MenuBarConstants.customerMenu;
        } else {
          return MenuBarConstants.adminMenu;
        }
      })
    );
  }
}
