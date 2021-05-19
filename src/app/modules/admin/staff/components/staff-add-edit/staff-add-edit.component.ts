import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';
import { MessageService } from 'src/app/services/util/messages/message.service';

@Component({
  selector: 'app-staff-add-edit',
  templateUrl: './staff-add-edit.component.html',
  styleUrls: ['./staff-add-edit.component.scss'],
})
export class StaffAddEditComponent implements OnInit {

  form: FormGroup;
  staff: Staff;
  countryList: string[];
  stateList: string[];

  displayButtonText: string;
  isEdit = false;

  constructor(
    private _staffService: StaffService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.countryList = AppConstant.countryList.sort();
    this.stateList = AppConstant.stateList.sort();

    await this.loadCustData();
  }

  async loadCustData() {

    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    const custId = actived.get('id');

    if (!custId) {

      this.staff = new Staff();
      this.staff.phoneCode = 91;
      this.staff.country = 'India';
      this.staff.joiningDate = new Date().toISOString();

      this.isEdit = false;
      this.displayButtonText = AppConstant.SAVE;
      // this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

      this.formControl();
    } else {
      this.isEdit = true;
      this.displayButtonText = AppConstant.UPDATE;

      // this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

      this.loadStaffById(custId);
    }
  }

  async onClick(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else if (!this.isEdit) {
      await this.onAdd();
    } else {
      await this.onUpdate();
    }
  }

  onCancel() {
    // this._navCtrl.navigateBack(UrlConstant.URL_ADMIN_STAFF);
    this._navCtrl.back();
  }

  private async loadStaffById(custId: string) {
    try {
      this.staff = await this._staffService.getStaffById(custId);
      this.formControl();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private formControl() {
    this.form = new FormGroup({
      firstName: new FormControl(this.staff.firstName, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      lastName: new FormControl(this.staff.lastName, {
        updateOn: 'change',
      }),
      age: new FormControl(this.staff.age, {
        updateOn: 'change'
      }),
      gender: new FormControl(this.staff.gender, {
        updateOn: 'change'
      }),
      email: new FormControl(this.staff.email, {
        updateOn: 'change',
        // validators: [Validators.required],
      }),
      phoneCode: new FormControl(this.staff.phoneCode, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      primaryPhoneNumber: new FormControl(this.staff.primaryPhoneNumber, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      mobile: new FormControl(this.staff.mobile, {
        updateOn: 'change',
      }),
      addressLine1: new FormControl(this.staff.addressLine1, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      addressLine2: new FormControl(this.staff.addressLine2, {
        updateOn: 'change',
      }),
      city: new FormControl(this.staff.city, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      state: new FormControl(this.staff.state, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      country: new FormControl(this.staff.country, {
        updateOn: 'change',
      }),
      pincode: new FormControl(this.staff.pincode, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      joiningDate: new FormControl(this.staff.joiningDate, {
        updateOn: 'change',
        validators: [Validators.required],
      })
    });
  }

  private async onAdd(): Promise<void> {
    const staffRecord: Staff = this.form.getRawValue();
    try {
      await this._staffService.saveStaff(staffRecord);
      const message = AppConstant.STAFF + SuccessConstants.SUCCESS_SAVE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private async onUpdate(): Promise<void> {
    const staffRecord: Staff = this.form.getRawValue();
    try {
      await this._staffService.updateStaff(this.staff.id, staffRecord);
      const message = AppConstant.STAFF + SuccessConstants.SUCCESS_UPDATE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

}
