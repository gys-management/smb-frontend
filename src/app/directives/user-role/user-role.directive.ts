import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRole } from 'src/app/enum/user-role.enum';
import { UserUtilService } from 'src/app/services/util/user/user-util.service';

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit {
  userRoles: UserRole[];

  constructor(
    private templateRef: TemplateRef<any>,
    private _userUtil: UserUtilService,
    private viewContainer: ViewContainerRef
  ) { }


  @Input()
  set appUserRole(roles: UserRole[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }

    this.userRoles = roles;
  }

  ngOnInit() {
    this._userUtil.userAuthorizationUtil(this.userRoles).subscribe(role => {
      if (role) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });

  }

}
