import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  headerModel = new HeaderModel(
    AppConstant.PROFILE,
    true,
    UrlConstant.URL_ADMIN_SETTINGS_PROFILE
  );

  form: FormGroup;
  organization: Organization;
  countryList: string[];
  stateList: string[];

  constructor(private _orgService: OrganizationService) {}

  ngOnInit() {
    this.countryList = AppConstant.countryList.sort();
    this.stateList = AppConstant.stateList.sort();
    this.loadOrgDetails();
  }

  async loadOrgDetails() {
    this._orgService.getOrganizationById.subscribe((org) => {
      if (org) {
        this.organization = org;
        this.formControl();
      }
    });
  }

  formControl() {
    this.form = new FormGroup({
      companyName: new FormControl(
        { value: this.organization.companyName, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(
        { value: this.organization.firstName, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        }
      ),
      lastName: new FormControl(
        { value: this.organization.lastName, disabled: true },
        {
          updateOn: 'change',
        }
      ),
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
      phoneNumber: new FormControl(
        {
          value: this.organization.phoneNumber,
          disabled: true,
        },
        {
          updateOn: 'change',
          validators: [Validators.required],
        }
      ),
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
      // const orgDetails: Organization = this.organizationFieldMapping();
      // this.onUpdateOrganization(orgDetails);
    }
  }
}
