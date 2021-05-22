import { Status } from '../enum/status.enum';

export class Customer {
  id: string;
  customerLoginId: string;
  companyName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phoneCode: number;
  phoneNumber: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gstNumber: string;
  joiningDate: string;
  status: Status;
  // visible?: booleanstring;
}


export class CustomerResponse {
  customers: Customer[]; // customer List response
  totalCount: number;  // total count is required, since pagination is handle in backend.
}
