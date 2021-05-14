import { PaymentMode } from 'src/app/enum/paymen.enum';
import { Customer } from '../customer.model';

export class Payment {
  amount: number;
  paymentMode: PaymentMode;
  customerId: string;
  paymentReference: string;
}

export class PaymentTotalResponse {
  totalOrderAmount: number;
  totalPaymentAmount: number;
  pendingAmount: number;
}

export class PaymentDetailResponse {
  customer: Customer;
  paymentTotalResponseDtoList: PaymentTotalResponse;
}


