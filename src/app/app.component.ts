import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { App } from '@capacitor/app';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppConstant } from './constants/app.constants';
import { Organization } from './models/organization.model';
import { OrganizationService } from './services/organization.service';
import { AuthService } from './services/util/auth/auth.service';
import { MenuBarService } from './services/util/menu/menu-bar.service';
import { NetworkUtilService } from './services/util/network/network-util.service';
import { ToastUtilService } from './services/util/toast/toast-util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  appPages: any[];
  organizationDetails: Organization;
  appCompSub: Subscription[] = [];

  constructor(
    private _platform: Platform,
    // private _splashScreen: SplashScreen,
    // private _statusBar: StatusBar,
    private _swUpdate: SwUpdate,
    private _toastUtilService: ToastUtilService,
    private _authService: AuthService,
    private _menuBarService: MenuBarService,
    private _modalCtrl: ModalController,
    private _orgService: OrganizationService,
    private _networkUtilService: NetworkUtilService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.softwareUpdateNotification();
    await this.displayMenuBar();
    await this.getOrganizationDetails();
  }

  // async ionViewWillEnter() {
  //   await this.getOrganizationDetails();

  // }

  async initializeApp() {
    await this._networkUtilService.getNetWorkStatus();

    this._platform.ready().then(() => {
      // this._statusBar.styleDefault();
      // this._splashScreen.hide();
      this.backButtonToExit();
    });
  }

  async logout() {
    await this._authService.logOutService();
  }

  refresh() {
    AppConstant.reload();
  }

  private backButtonToExit() {
    const platformSub = this._platform.backButton.subscribeWithPriority(
      999,
      async () => {
        if (this._modalCtrl.getTop()) {
          const modal = await this._modalCtrl.getTop();
          if (modal) {
            this._modalCtrl.dismiss();
            return;
          }
        }
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      }
    );
    this.appCompSub.push(platformSub);
  }

  private softwareUpdateNotification() {
    if (this._swUpdate.isEnabled) {
      const softUpdateSub = this._swUpdate.available.subscribe(
        async (event) => {
          console.log('current version is', event.current);
          console.log('available version is', event.available);
          this._toastUtilService.presentUpdateToast().then((res) => {
            res
              .onDidDismiss()
              .then(() => this._swUpdate.activateUpdate())
              .then(() => this.refresh());
          });
        }
      );
      this.appCompSub.push(softUpdateSub);
    }
  }

  private async displayMenuBar() {
    this._menuBarService.menuBar().subscribe((result) => {
      this.appPages = result;
    });
  }

  private async getOrganizationDetails() {
    setTimeout(async () => {
      this._orgService.getOrganizationById.subscribe((org) => {
        if (org) {
          this.organizationDetails = org;
        }
      });
    }, 3000);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy(): void {
    // CommonUtils.unSubcribe(this.appCompSub);
  }
}
