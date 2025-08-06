import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';
import { LoginOAuthModel } from 'src/app/models/auth/loginOAuth.model';
import { OauthService } from 'src/app/services/util/auth/oauth.service';
import { ToastUtilService } from 'src/app/services/util/toast/toast-util.service';
import { SpinnerService } from 'src/app/services/util/spinner/spinner.service';
import { UrlConstant } from 'src/app/constants/url.constants';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { OAuthModel } from 'src/app/models/auth/oAuth.model';
import { LoginComponent } from '../login/components/login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignupPage implements OnInit {
  @Output() oAuthBehaviourSubject: BehaviorSubject<OAuthModel> =
    new BehaviorSubject<OAuthModel>(null);

  @ViewChild('stepper') private _matStepper: MatStepper;

  isEditable: true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  idToken: string;
  oAuthLocal: OAuthModel;

  loginURL = UrlConstant.URL_LOGIN;
  ERR_REGISTRATION = ErrorConstant.ERR_REGISTRATION;
  firstFormGroupErrorMessage = ErrorConstant.ERR_OAUTH_GOOGLE;

  constructor(
    private _formBuilder: FormBuilder,
    private _oAuthService: OauthService,
    private _navCtrl: NavController,
    private _customToastCtrl: ToastUtilService // private _loginComp: LoginComponent
  ) {}

  ngOnInit() {
    this.formGroup();
  }

  formGroup() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  async onSignUpGoogle() {
    // First pop up the google sign-in page and start the loading controller popup.
    // else it will block the G+ sign-in popup
    const googleSignCall = this._oAuthService.googleAuth();

    // this._customLoadinCtrl.load('Authenticating').then((loadinCtrl) => {
    googleSignCall
      .then((googleSign: any) => {
        this.firstFormGroup
          .get('firstCtrl')
          .patchValue(SuccessConstants.SUCCESS_OAUTH_GOOGLE);

        this.oAuthLocal = new OAuthModel(
          googleSign.additionalUserInfo.profile.name,
          googleSign.additionalUserInfo.profile.email,
          googleSign.additionalUserInfo.profile.given_name,
          googleSign.additionalUserInfo.profile.family_name,
          googleSign.additionalUserInfo.providerId
        );

        this.idToken = googleSign.user.xa;

        this.oAuthBehaviourSubject.next(this.oAuthLocal);
        this._matStepper.next();

        // loadinCtrl.dismiss();
      })
      .catch((error) => {
        this.firstFormGroup.get('firstCtrl').markAsDirty();
        this._customToastCtrl.presentToast(error.message + ' Kindly try again');
        this.firstFormGroupErrorMessage = error.message;
        // loadinCtrl.dismiss();
      });
    // });
  }

  onRegistered(result: any) {
    if (result) {
      this.secondFormGroup
        .get('secondCtrl')
        .patchValue(SuccessConstants.SUCCESS_REGISTRATION);
      this.onLoginToDashboard(); // after register login directly
      this._matStepper.next();
    } else {
      this.secondFormGroup.get('secondCtrl').markAsDirty();
    }
  }

  onLoginPageNav() {
    this._navCtrl.navigateBack(this.loginURL);
  }

  onLoginToDashboard() {
    const loginOAuthModelLocal: LoginOAuthModel = {
      idToken: this.idToken,
      providerId: this.oAuthLocal.providerId,
    };
    // this._loginComp.authenticateOAuth(loginOAuthModelLocal);
  }
}
