import { ActionSheetController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { PaymentTotalResponse } from 'src/app/models/payments/paymentTotalResponse.model';

@Injectable()
export class ReminderPaymentController {
  customer: Customer;
  paymentTotal: PaymentTotalResponse;

  constructor(
    private _actionCtrl: ActionSheetController,
    private _platform: Platform
  ) {

  }

  async reminderPresentSheet(customer: Customer, paymentTotal: PaymentTotalResponse) {
    this.customer = customer;
    this.paymentTotal = paymentTotal;

    const alert = await this._actionCtrl.create({
      header: 'Send Reminder',
      buttons: this.reminderButtons()
    });

    alert.present();
  }

  frameTextMessage() {
    const message = `Dear + ${this.customer.companyName},\
    Our records show that you have an outstanding payment of ₹ ${this.paymentTotal.pendingAmount}.\
    Kindly reach us if you have queries \  ${this.customer.phoneNumber} `;

    const to = '+91' + this.customer.phoneNumber;

    return { message, to };
  }


  frameMailMessage() {
    const message = `Dear + ${this.customer.companyName},\
    Our records show that you have an outstanding payment of ₹ ${this.paymentTotal.pendingAmount}.\
    Kindly reach us if you have queries \  ${this.customer.phoneNumber} `;

    const emailTo = this.customer.email;

    const subject = 'Payment Reminder';

    return { message, emailTo, subject };
  }


  reminderButtons() {
    const button = [];

    // Whatsapp
    button.push({
      text: 'Whatsapp',
      icon: 'logo-whatsapp',
      cssClass: 'action-sheet-success',
      handler: () => {
        const { message, to } = this.frameTextMessage();
        const url = `https://api.whatsapp.com/send?phone=${to}&text=${message}`;
        window.open(url);
      }
    });

    // show SMS only if its not desktop or desktop app
    if (!this._platform.is('desktop') && !this._platform.is('electron')) {
      button.push({
        text: 'SMS',
        icon: 'document-text-outline',
        cssClass: 'action-sheet-primary',
        handler: () => {
          const { message, to } = this.frameTextMessage();
          const url = `sms:${to}?body=${message}`;
          window.open(url);
        }
      });
    }
    // email
    button.push({
      text: 'E-Mail',
      icon: 'mail-outline',
      cssClass: 'action-sheet-google',
      handler: () => {
        const { message, emailTo, subject } = this.frameMailMessage();
        const url = `mailto:${emailTo}?subject=${subject}&body=${message}`;

        window.open(url);

        // just for reference email function is kept
        // const emailSub = this._emailService.sendEmail(this.frameMailMessage()).subscribe((emailResponse) => {
        //   // console.log(emailResponse);
        //   this._customToastCtrl.presentToast(OrderConstant.SUCCESS_EMAIL_SENDING);
        // }, (error) => {
        //   this._customToastCtrl.presentToast(OrderConstant.ERR_EMAIL_SENDING);
        //   // console.log(error);
        // });
        // this.detailSub.push(emailSub);
      }
    },
      {
        text: 'Close',
        icon: 'close',
        cssClass: 'action-sheet-danger',
        role: 'cancel',
        handler: () => {
        },
      });
    return button;
  }

}
