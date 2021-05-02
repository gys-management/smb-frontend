import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { SpinnerService } from 'src/app/services/util/spinner/spinner.service';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { OauthService } from 'src/app/services/util/auth/oauth.service';
import { UrlConstant } from 'src/app/constants/url.constants';
import { LoginOAuthModel } from 'src/app/models/auth/loginOAuth.model';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { AuthService } from 'src/app/services/util/auth/auth.service';
import { AppConstant } from 'src/app/constants/app.constants';
import { LoginModel } from 'src/app/models/auth/login.model';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  // login: LoginModel = { userName: '7845781006', password: 'User@123' };
  login: LoginModel;
  login_url;

  loginSub: Subscription[] = [];
  isLoading = false;

  constructor(
    private _menu: MenuController,
    private _authService: AuthService,
    private _router: Router,
    private _loadingCtrl: SpinnerService,
    private _customAlertCtrl: AlertUtilService,
    private _storage: Storage,
    // private _orginazationService: OrganizationService,
    private _oAuthService: OauthService,
    // private _configurationServices: ConfigurationService
  ) { }

  ngOnInit() {
    this.login_url = {
      dashboard: UrlConstant.URL_ADMIN_DASHBOARD,
      signup: UrlConstant.URL_SIGN_UP
    };
    this._authService.userRoleNavigation();
  }

  ionViewDidEnter() {
    this._menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this._menu.enable(true);
  }

  onSignup() {
    this._router.navigateByUrl(this.login_url.signup);
  }

  onLogin(form: LoginModel) {
    this.authenticate(form);
  }

  onLoginGoogle() {
    // First pop up the google sign-in page and start the loading controller popup.
    // else it will block the G+ sign-in popup
    const googleSignCall = this._oAuthService.googleAuth();

    // this._customLoadinCtrl.load('Authenticating').then((loadinCtrl) => {
    googleSignCall
      .then(
        (googleSign: any) => {
          const loginOAuthModelLocal: LoginOAuthModel = {
            idToken: googleSign.user.za,
            providerId: googleSign.credential.providerId
          };
          this.authenticateOAuth(loginOAuthModelLocal);
        })
      .catch((error) => {
        this._customAlertCtrl.presentAlert({ message: error.message + ' Kindly try again' });
      });
    // });
  }

  onSignOut() {
    this._oAuthService.signOut();
  }

  onLoginTwitter() {
    this._oAuthService.twitterAuth();
  }

  onLoginGithub() {
    this._oAuthService.gitHubAuth();
  }

  authenticate(login: LoginModel) {
    this.isLoading = true;
    // this._loadingCtrl.presentSpinner('Logging in').then((loadingEl) => {
    // loadingEl.present();
    const loginAuthSub: Subscription = this._authService.loginService(login).subscribe(
      (resData) => {
        this.isLoading = false;
        // Load the orgnazition details to subject when user logs in
        this.orgLoadData();
      },
      (error) => {
        // loadingEl.dismiss();
        this.errorMessageHandle(error);
      }
    );
    // });

    this.loginSub.push(loginAuthSub);

  }

  authenticateOAuth(login: LoginOAuthModel) {
    this.isLoading = true;
    // this._loadingCtrl.load('Logging in').then((loadingEl) => {
    // loadingEl.present();
    const loginAuthSub: Subscription = this._authService.loginOAuthService(login).subscribe(
      (resData) => {
        this.isLoading = false;
        // Load the orgnazition details to subject when user logs in
        this.orgLoadData();
      },
      (error) => {
        this.isLoading = false;
        // loadingEl.dismiss();
        this.errorMessageHandle(error);
      }
    );
    // });

    this.loginSub.push(loginAuthSub);
  }

  private orgLoadData() {
    this.loadInitalDetails();
    // loadingEl.dismiss();
    this._router.navigateByUrl(UrlConstant.URL_ADMIN_DASHBOARD);
  }

  private loadInitalDetails() {
    // const orgSub = this._orginazationService.fetchOrginzationById().subscribe();
    // const configSub = this._configurationServices.fetchConfigurationDetails().subscribe();
    // this.loginSub.push(orgSub);
    // this.loginSub.push(configSub);

  }

  private errorMessageHandle(error: any) {
    const errorCode = error.CustomError.errorCode;
    if (errorCode) {
      this._customAlertCtrl.presentAlert({ message: ErrorConstant[errorCode] });
    }
    else {
      this._customAlertCtrl.presentAlert({ message: ErrorConstant.ERR_CUSTOM });
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    this.loginSub.forEach(loginSub => {
      if (loginSub) {
        loginSub.unsubscribe();
      }
    });

  }

}
