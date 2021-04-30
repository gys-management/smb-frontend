import { Injectable } from '@angular/core';
import { MenuBarConstants } from 'src/app/constants/menu-bar-constants';
import { UserRole } from 'src/app/enum/user-role.enum';
import { UserUtilService } from '../user/user-util.service';

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {

  constructor(
    private _userUtilService: UserUtilService
  ) { }

  async menuBar() {
    const isDealerRole: boolean = await this._userUtilService.userAuthorizationUtil([UserRole.DEALER]);
    if (isDealerRole) {
      return MenuBarConstants.dealerMenu;
    } else {
      return MenuBarConstants.adminMenu;
    }
  }
}
