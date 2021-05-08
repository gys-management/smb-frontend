export class Customer {
  id: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  gstNumber: string;
  receivedAmt?: string;
  pendingAmt?: string;
  // visible?: booleanstring;
}


export class CustomerResponse {
  customers: Customer[]; // customer List response
  totalCount: number;  // total count is required, since pagination is handle in backend.
}
