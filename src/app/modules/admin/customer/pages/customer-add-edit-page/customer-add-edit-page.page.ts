import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { SuccessConstants } from 'src/app/constants/success-constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { Customer } from 'src/app/models/customer.model';
import { HeaderModel } from 'src/app/models/header.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MessageService } from 'src/app/services/util/messages/message.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-customer-add-edit-page',
  templateUrl: './customer-add-edit-page.page.html',
  styleUrls: ['./customer-add-edit-page.page.scss'],
})
export class CustomerAddEditPagePage implements OnInit {
  headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

  form: FormGroup;
  customer: Customer;
  countryList: string[];
  stateList: string[];

  displayButtonText: string;
  isEdit = false;

  constructor(
    private _custService: CustomerService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _modalService: ModalUtilService,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
    this.countryList = AppConstant.countryList.sort();
    this.stateList = AppConstant.stateList.sort();

    this.loadCustData();
  }

  async loadCustData() {

    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    const custId = actived.get('id');

    if (!custId) {

      this.customer = new Customer();
      this.customer.phoneCode = 91;
      this.customer.country = 'India';
      this.customer.joiningDate = new Date().toISOString();

      this.isEdit = false;
      this.displayButtonText = AppConstant.SAVE;
      this.headerModel = new HeaderModel(AppConstant.ADD, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

      this.formControl();
    } else {
      this.isEdit = true;
      this.displayButtonText = AppConstant.UPDATE;

      this.headerModel = new HeaderModel(AppConstant.UPDATE, false, UrlConstant.URL_ADMIN_CUSTOMER, false);

      this.loadCustomerDetailById(custId);
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
    // this._navCtrl.navigateBack(UrlConstant.URL_ADMIN_CUSTOMER);
    this._navCtrl.back();
  }

  private async loadCustomerDetailById(custId: string) {
    try {
      this.customer = await this._custService.getCustomerById(custId);
      this.formControl();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private formControl() {
    this.form = new FormGroup({
      companyName: new FormControl(this.customer.companyName, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      firstName: new FormControl(this.customer.firstName, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      lastName: new FormControl(this.customer.lastName, {
        updateOn: 'change',
      }),
      age: new FormControl(this.customer.age, {
        updateOn: 'change'
      }),
      gender: new FormControl(this.customer.gender, {
        updateOn: 'change'
      }),
      email: new FormControl(this.customer.email, {
        updateOn: 'change',
        // validators: [Validators.required],
      }),
      phoneCode: new FormControl(this.customer.phoneCode, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl(this.customer.phoneNumber, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      gstNumber: new FormControl(this.customer.gstNumber, {
        updateOn: 'change',
      }),
      addressLine1: new FormControl(this.customer.addressLine1, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      addressLine2: new FormControl(this.customer.addressLine2, {
        updateOn: 'change',
      }),
      city: new FormControl(this.customer.city, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      state: new FormControl(this.customer.state, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      country: new FormControl(this.customer.country, {
        updateOn: 'change',
      }),
      pincode: new FormControl(this.customer.pincode, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      joiningDate: new FormControl(this.customer.joiningDate, {
        updateOn: 'change',
        validators: [Validators.required],
      })
    });
  }

  private async onAdd(): Promise<void> {
    const customerRecord: Customer = this.form.getRawValue();
    try {
      await this._custService.addCustomer(customerRecord);
      const message = AppConstant.CUSTOMER + SuccessConstants.SUCCESS_SAVE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }

  private async onUpdate(): Promise<void> {
    const customerRecord: Customer = this.form.getRawValue();
    try {
      await this._custService.updateCustomer(this.customer.id, customerRecord);
      const message = AppConstant.CUSTOMER + SuccessConstants.SUCCESS_UPDATE;

      this._messageService.messageSuccessToast(message);
      this.onCancel();
    }
    catch (error) {
      this._messageService.messageErrorToast(error);
    }
  }


}
