import { Status } from '../enum/status.enum';
export class Staff {
  id: string;
  staffLoginId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phoneCode: number;
  primaryPhoneNumber: number;
  mobile: string;
  fax: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  status: Status;
  joiningDate: string;
  leavingDate: string;
}

