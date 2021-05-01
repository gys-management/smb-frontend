import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUtilService {

  constructor(
    private _modalCtrl: ModalController
  ) { }

  async presentModal(
    component: any,
    // componentProps?: object,
    componentProps?: Record<string, string>,
    cssClass: string = 'modal-fullscreen',
    backdropDismiss: boolean = true,
    swipeToClose: boolean = true,
  ) {
    const modal = await this._modalCtrl.create({
      cssClass,
      component,
      componentProps,
      backdropDismiss,
      swipeToClose,
      presentingElement: await this._modalCtrl.getTop()
    });
    await modal.present();
    return modal.onDidDismiss();
  }

  async dismissPresentModal(data?: any, role?: string) {
    await this._modalCtrl.dismiss(data, role);
  }
}
