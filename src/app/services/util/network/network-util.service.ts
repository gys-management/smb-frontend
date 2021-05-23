import { Injectable } from '@angular/core';
import { NetworkStatus, PluginListenerHandle, Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { LoggerService } from '../logger/logger.service';
import { ToastUtilService } from '../toast/toast-util.service';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NetworkUtilService {

  networkStatus: any;
  networkListener: PluginListenerHandle;

  constructor(
    private _navCtrl: NavController,
    private _toastUtilService: ToastUtilService
  ) {
    this.networkListener = Network.addListener('networkStatusChange', (status: NetworkStatus) => {
      this.networkStatus = status;

      // check the status has changed and notify user.
      if (this.networkStatus.connected) {
        // this._navCtrl.back();
        this._toastUtilService.presentToast(SuccessConstants.SUCCESS_INTERNET);
      } else if (!this.networkStatus.connected) {
        this._navCtrl.navigateForward(UrlConstant.URL_INTERNET_ERROR);
      }
      LoggerService.log(`NetworkUtilService :: Network status changed ::`, status);
    });
  }

  // Get the current network status
  async getNetWorkStatus() {
    this.networkStatus = await Network.getStatus();

    LoggerService.log(`NetworkUtilService :: getNetWorkStatus ::`, this.networkStatus);
    // check the current status and notify user if offline
    if (!this.networkStatus.connected) {
      this._navCtrl.navigateForward(UrlConstant.URL_INTERNET_ERROR);
    }
  }

  endNetworkListener() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }
}
