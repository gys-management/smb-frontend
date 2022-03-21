import { Injectable, NgZone } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network, NetworkStatus } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { LoggerService } from '../logger/logger.service';
import { ToastUtilService } from '../toast/toast-util.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkUtilService {
  networkStatus: any;
  networkListener: PluginListenerHandle;
  duration = 10000;

  constructor(
    private _navCtrl: NavController,
    private _toastUtilService: ToastUtilService,
    private ngZone: NgZone
  ) {
    this.networkListener = Network.addListener(
      'networkStatusChange',
      (status: NetworkStatus) => {
        this.networkStatus = status;
        this.ngZone.run(() => {
          // check the status has changed and notify user.
          if (this.networkStatus.connected) {
            // this._navCtrl.back();
            this._toastUtilService.presentToast(
              SuccessConstants.SUCCESS_INTERNET
            );
          } else if (!this.networkStatus.connected) {
            this._toastUtilService.presentToast(
              ErrorConstant.ERR_INTERNET,
              this.duration
            );
            // this._navCtrl.navigateRoot(UrlConstant.URL_INTERNET_ERROR);
          }
          LoggerService.log(
            `NetworkUtilService :: Network status changed ::`,
            status
          );
        });
      }
    );
  }

  // Get the current network status
  async getNetWorkStatus() {
    this.networkStatus = await Network.getStatus();

    LoggerService.log(
      `NetworkUtilService :: getNetWorkStatus ::`,
      this.networkStatus
    );
    // check the current status and notify user if offline
    if (!this.networkStatus.connected) {
      this._toastUtilService.presentToast(
        ErrorConstant.ERR_INTERNET,
        this.duration
      );
      // this._navCtrl.navigateRoot(UrlConstant.URL_INTERNET_ERROR);
    }
  }

  endNetworkListener() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }
}
