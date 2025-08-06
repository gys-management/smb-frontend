import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AppConstant } from 'src/app/constants/app.constants';
import { LoginConstant } from 'src/app/constants/login.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { OAuthModel } from 'src/app/models/auth/oAuth.model';
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { AuthService } from 'src/app/services/util/auth/auth.service';
import { ToastUtilService } from 'src/app/services/util/toast/toast-util.service';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.scss'],
})
export class OrganizationRegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  orgSubList: Subscription[] = [];
  countryList: string[];
  stateList: string[];
  organization: Organization;

  @Input() signupDetails: BehaviorSubject<OAuthModel> =
    new BehaviorSubject<OAuthModel>(null);
  @Output() orgAddedBool: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _organizationService: OrganizationService,
    // private _customLoadingCtrl: CustomLoadingController,
    private _customAlertCtrl: AlertUtilService,
    private _customToastCtrl: ToastUtilService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDefatulValues();
    this.loadOrgDetails();
  }

  loadDefatulValues() {
    this.countryList = AppConstant.countryList.sort();
    this.stateList = AppConstant.stateList.sort();
  }

  loadOrgDetails() {
    this.organization = {
      id: '',
      orgNumber: 0,
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: 'India',
      pincode: null,
      gstNumber: '',
      providerId: '',
      profilePic: '',
    };

    const signUpSub = this.signupDetails.subscribe((signupResponse) => {
      if (signupResponse) {
        // this._customLoadingCtrl.load('Loading').then((loadingCtrl) => {
        this.organization.email = signupResponse.email;
        this.organization.firstName = signupResponse.given_name;
        this.organization.lastName = signupResponse.family_name;
        this.organization.providerId = signupResponse.providerId;
        this.checkIsEmailPresentAlready(
          this.organization.email,
          this.organization.providerId
          // loadingCtrl
        );
        // });
      }
    });
    this.orgSubList.push(signUpSub);
  }

  checkIsEmailPresentAlready(
    email: string,
    providerId: string
    // loadingCtrl: HTMLIonLoadingElement
  ) {
    const isEmailPresentSub = this._authService
      .checkIsEmailPresent(email, providerId)
      .subscribe(
        (emailPresentRes) => {
          if (emailPresentRes) {
            this._customToastCtrl.presentToast(
              LoginConstant.EMAIL_ALREADY_EXISTS
            );
            this.orgAddedBool.emit(true);
          } else {
            this.formControl();
          }
          // settimeout is added due to loading time of form
          // setTimeout(() => {
          //   loadingCtrl.dismiss();
          // }, 1000);
        },
        (error) => {
          // loadingCtrl.dismiss();
          this._customAlertCtrl.presentAlert({
            message: LoginConstant.ERR_OAUTH_GOOGLE,
            backdropDismiss: false,
            buttons: [
              {
                text: 'Close',
                role: 'cancel',
              },
            ],
          });
        }
      );
    this.orgSubList.push(isEmailPresentSub);
  }

  formControl() {
    this.form = new FormGroup({
      companyName: new FormControl(this.organization.companyName, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      firstName: new FormControl(this.organization.firstName, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      lastName: new FormControl(this.organization.lastName, {
        updateOn: 'change',
      }),
      email: new FormControl(
        {
          value: this.organization.email,
          disabled: true,
        },
        {
          updateOn: 'change',
          validators: [Validators.required],
        }
      ),
      phoneNumber: new FormControl(this.organization.phoneNumber, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      gstNumber: new FormControl(this.organization.gstNumber, {
        updateOn: 'change',
      }),
      addressLine1: new FormControl(this.organization.addressLine1, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      addressLine2: new FormControl(this.organization.addressLine2, {
        updateOn: 'change',
      }),
      city: new FormControl(this.organization.city, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      state: new FormControl(this.organization.state, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      country: new FormControl(this.organization.country, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      pincode: new FormControl(this.organization.pincode, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onClick() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const orgDetails: Organization = this.organizationFieldMapping();

      this.onAddOrganization(orgDetails);
    }
  }

  private onAddOrganization(orgDetails: Organization) {
    // this._customLoadingCtrl.load('Registering').then((loadingCtrl) => {
    const updateOrg = this._organizationService.addOrginzation(orgDetails).then(
      () => {
        // this._cutomToastCtrl.presentToast(SuccessConstants.SUCCESS_REGISTERED);
        // loadingCtrl.dismiss();
        this.orgAddedBool.emit(true);
      },
      (error) => {
        const errorCode = error.CustomError.errorCode;
        const defaultMessage = LoginConstant.ERR_REGISTRATION;
        this.errorMessageDsiplay(errorCode, defaultMessage);

        // loadingCtrl.dismiss();
        this.orgAddedBool.emit(false);
      }
    );
    // });
  }

  private errorMessageDsiplay(errorCode: any, defaultMessage: string) {
    if (errorCode) {
      this._customAlertCtrl.presentAlert(LoginConstant[errorCode]);
    } else {
      this._customToastCtrl.presentToast(defaultMessage);
    }
  }

  private organizationFieldMapping() {
    const formValue = this.form.value;
    const orgDetails: Organization = {
      companyName: formValue.companyName,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: this.organization.email,
      phoneNumber: formValue.phoneNumber,
      addressLine1: formValue.addressLine1,
      addressLine2: formValue.addressLine2,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country,
      pincode: formValue.pincode,
      gstNumber: formValue.gstNumber,
      providerId: this.organization.providerId,
      id: '',
      orgNumber: 0,
      profilePic: '',
    };

    return orgDetails;
  }

  ngOnDestroy() {
    this.orgSubList.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
