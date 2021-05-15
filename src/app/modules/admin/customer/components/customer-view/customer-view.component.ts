import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AppConstant } from 'src/app/constants/app.constants';
import { Customer } from 'src/app/models/customer.model';
import { PaymentTotalResponse } from 'src/app/models/payments/payment.model';
import { PaymentHistoryComponent } from 'src/app/modules/shared/payment/payment-history/payment-history.component';
import { ReminderPaymentController } from 'src/app/modules/utils/reminderPayment.controller';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  custId: string;
  customerDetails: Customer;
  paymentTotal: PaymentTotalResponse;

  whatsappURL: string;
  phoneURL: string;

  constructor(
    private _custService: CustomerService,
    private _activatedRoute: ActivatedRoute,
    private _paymentService: PaymentService,
    private _reminderPaymentCtrl: ReminderPaymentController,
    private _actionUtilSerice: ActionSheetUtilService,
    private _navCtrl: NavController,
    private _modalUtilService: ModalUtilService

  ) { }

  async ngOnInit() {
    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    this.custId = actived.get('id');


    this.fetchCustomerDetails(this.custId);
    this.fetchPaymentDetailsByCustomerId(this.custId);
  }

  async fetchCustomerDetails(custId: string) {
    this.customerDetails = await this._custService.getCustomerById(custId);
    this.whatsappURL = `https://wa.me/91${this.customerDetails.phoneNumber}`;
    this.phoneURL = `tel:+91${this.customerDetails.phoneNumber}`;


  }

  async fetchPaymentDetailsByCustomerId(custId: string) {
    this.paymentTotal = await this._paymentService.getTotalPaymentByCustomerId(custId);
  }

  async presentActionSheet() {
    await this._actionUtilSerice.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'Payment History',
          icon: 'wallet-outline',
          cssClass: 'action-sheet-facebook',
          handler: () => {
            this.loadPaymentHistoryComp(this.customerDetails.id);
          },
        },
        {
          text: 'Send Reminder',
          icon: 'arrow-redo-circle-outline',
          cssClass: 'action-sheet-danger',
          handler: () => {
            this.reminderPresentSheet();
          },
        },
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateForward([
              // this.customerURL.editCustomer + this.customerDetails.id,
            ]);
          },
        },
        {
          text: 'Close',
          icon: 'close',
          cssClass: 'action-sheet-danger',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
  }

  async reminderPresentSheet() {
    await this._reminderPaymentCtrl.reminderPresentSheet(this.customerDetails, this.paymentTotal);
  }

  private async loadPaymentHistoryComp(customerId: string) {
    await this._modalUtilService.presentModal(
      PaymentHistoryComponent,
      { customerId },
      // AppConstant.CSS_MODAL_75_PER_SCREEN,
    );

  }
}
