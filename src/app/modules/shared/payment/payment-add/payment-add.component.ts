import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { UrlConstant } from 'src/app/constants/url.constants';
import { PaymentMode } from 'src/app/enum/paymen.enum';
import { HeaderModel } from 'src/app/models/header.model';
import { Order } from 'src/app/models/order.model';
import { Payment } from 'src/app/models/payments/payment.model';
import { AlertUtilService } from 'src/app/services/util/alert/alert-util.service';
import { MessageService } from 'src/app/services/util/messages/message.service';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss'],
})
export class PaymentAddComponent implements OnInit {
  @Input() order: Order;

  headerModel = new HeaderModel(AppConstant.PAYMENT, false, null, false);

  form: FormGroup;
  payment: Payment;
  paymentModeArray = PaymentMode;

  constructor(
    private _modalController: ModalController,
    private _msgService: MessageService
  ) { }

  ngOnInit() {
    this.payment = new Payment();
    this.formControl();
  }


  formControl() {
    this.form = new FormGroup({
      amount: new FormControl(this.payment.amount, {
        updateOn: 'change',
        validators: [Validators.min(1), Validators.required]
      }),
      paymentMode: new FormControl(this.payment.paymentMode, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      paymentReference: new FormControl(this.payment.paymentMode, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      paymentDate: new FormControl(this.payment.paymentDate, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }


  onSuccess() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const data: Payment = this.form.getRawValue();
      this.checkAmountIsGreaterThanOrderAmt(data);

    }
  }

  onCancel() {
    this._modalController.dismiss(null, AppConstant.CANCEL_MODAL);
  }

  checkAmountIsGreaterThanOrderAmt(data: Payment) {
    if (this.order.finalAmount < data.amount) {
      const message = `Paid Amount should not be greater than Order value - ₹${this.order.finalAmount}`;
      this._msgService.messageErrorAlert(null, message);
      return;
    } else {
      this._modalController.dismiss(data, AppConstant.CONFIRM_MODAL);
    }
  }

}
