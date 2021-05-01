import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core/dist/types/components/alert/alert-interface';

@Injectable({
  providedIn: 'root'
})
export class AlertUtilService {

  button = [
    {
      text: 'Close',
      role: 'cancel'
    },
    {
      text: 'Okay',
    }
  ];

  constructor(private _alertCtrl: AlertController) { }


  async presentAlert(opts?: AlertOptions) {
    if (!opts.buttons) {
      opts.buttons = this.button;
    }
    const alert = await this._alertCtrl.create({
      // cssClass: 'my-custom-class', //furture reference
      header: opts.header,
      subHeader: opts.subHeader,
      message: opts.message,
      inputs: opts.inputs,
      buttons: opts.buttons
    });

    await alert.present();
  }
}
