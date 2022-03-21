import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { OauthService } from 'src/app/services/util/auth/oauth.service';
import { UrlConstant } from 'src/app/constants/url.constants';
import { LoginOAuthModel } from 'src/app/models/auth/loginOAuth.model';
import { AuthService } from 'src/app/services/util/auth/auth.service';
import { LoginModel } from 'src/app/models/auth/login.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { take } from 'rxjs/operators';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    private _messageService: MessageService,
    private _orginazationService: OrganizationService,
    private _oAuthService: OauthService
  ) // private _configurationServices: ConfigurationService
  {}

  ngOnInit() {
    this.login_url = {
      dashboard: UrlConstant.URL_ADMIN_DASHBOARD,
      signup: UrlConstant.URL_SIGN_UP,
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
      .then((googleSign: any) => {
        const loginOAuthModelLocal: LoginOAuthModel = {
          idToken: googleSign.user.za,
          providerId: googleSign.credential.providerId,
        };
        this.authenticateOAuth(loginOAuthModelLocal);
      })
      .catch((error) => {
        // const message = error.message + ' Kindly try again';
        this._messageService.messageErrorAlert(error);
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
    const loginAuthSub: Subscription = this._authService
      .loginService(login)
      .subscribe(
        (resData) => {
          if (resData) {
            // Load the orgnazition details to subject when user logs in
            this.orgLoadData();
          }
        },
        (error) => {
          this._messageService.messageErrorAlert(error);
        }
      );
    this.loginSub.push(loginAuthSub);
  }

  authenticateOAuth(login: LoginOAuthModel) {
    const loginAuthSub: Subscription = this._authService
      .loginOAuthService(login)
      .subscribe(
        (resData) => {
          // Load the orgnazition details to subject when user logs in
          this.orgLoadData();
        },
        (error) => {
          this._messageService.messageErrorAlert(error);
        }
      );
    this.loginSub.push(loginAuthSub);
  }

  private orgLoadData() {
    AppConstant.reload();
    const orgSub = this._orginazationService
      .fetchOrginzationById()
      .pipe(take(2))
      .subscribe();
    this.loginSub.push(orgSub);

    // const configSub = this._configurationServices.fetchConfigurationDetails().subscribe();
    // this.loginSub.push(configSub);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    this.loginSub.forEach((loginSub) => {
      if (loginSub) {
        loginSub.unsubscribe();
      }
    });
  }
}
