import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserRoleDirective } from './user-role/user-role.directive';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [UserRoleDirective],
  exports: [UserRoleDirective]
})
export class DirectivesModule { }
