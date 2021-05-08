import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen, App } from '@capacitor/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppConstant } from './constants/app.constants';
import { CommonUtils } from './modules/utils/common.utils';
import { AuthService } from './services/util/auth/auth.service';
import { MenuBarService } from './services/util/menu/menu-bar.service';
import { ToastUtilService } from './services/util/toast/toast-util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  appPages: any[];
  // organizationDetails: Organization;
  appCompSub: Subscription[] = [];

  constructor(
    private _platform: Platform,
    // private _splashScreen: SplashScreen,
    // private _statusBar: StatusBar,
    private _swUpdate: SwUpdate,
    private _toastUtilService: ToastUtilService,
    private _authService: AuthService,
    private _menuBarService: MenuBarService,
    // private _orgService: OrganizationService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.softwareUpdateNotification();
    await this.displayMenuBar();
    await this.getOrganizationDetails();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      // this._statusBar.styleDefault();
      // this._splashScreen.hide();
      this.backButtonToExit();
    });
  }

  private backButtonToExit() {
    const platformSub = this._platform.backButton.subscribe(() => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.appCompSub.push(platformSub);
  }

  private softwareUpdateNotification() {
    if (this._swUpdate.isEnabled) {
      const softUpdateSub = this._swUpdate.available.subscribe(async event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        this._toastUtilService.presentUpdateToast().then(
          (res) => {
            res.onDidDismiss()
              .then(() => this._swUpdate.activateUpdate())
              .then(() => this.refresh());
          });
      });
      this.appCompSub.push(softUpdateSub);
    }
  }

  private refresh() {
    AppConstant.reload();
  }

  private logout() {
    this._authService.logOutService();
  }

  private async displayMenuBar() {
    this._menuBarService.menuBar().subscribe(result => {
      this.appPages = result;
    });
  }

  private async getOrganizationDetails() {
    // this.organizationDetails = await this._orgService.getOrganizationById();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy(): void {
    CommonUtils.unSubcribe(this.appCompSub);
  }
}
