import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { ModalUtilService } from '../modal/modal-util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomBackButtonService {

  headerModel: any;

  constructor(
    private _navCtrl: NavController,
    private _modalSerice: ModalUtilService
  ) { }

  async backButton() {
    const result = await this._modalSerice.isModalPresent();
    if (result !== undefined) {
      this.dismissComp();
    } else {
      const value = this._navCtrl.back();
      if (value !== undefined) {
        this._navCtrl.back();
      } else {
        this._navCtrl.navigateBack(this.headerModel.defaultRoutingUrl);
      }
    }
  }

  dismissComp() {
    this._modalSerice.dismissPresentModal(null, AppConstant.CANCEL_MODAL);
  }

}
