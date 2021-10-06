import { OrderStatus } from '../enum/order-status.enum';
import { PaymentMode } from '../enum/paymen.enum';

export class Order {
  id?: string;
  customerId: string;
  orderNumber: number;
  invoiceNumber: string;
  reference: string;
  orderedDate: string;
  estimatedDeliveryDate: string;
  deliveredDate?: string;
  subTotal: number;
  discount: number;
  finalAmount: number;
  gstValue?: string;
  orderItems: OrderItem[];
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  orderStatus?: OrderStatus;
  companyName?: string;
  amountPaid: number;
  paymentMode?: PaymentMode;
  paymentReference: string;
  paymentDate: Date;

  total: number;
  roundOffAmount: number;
  orderMargin: number;

  pcId: string; // product category ID
  // ui fields
  color?: string;
}


export class OrderItem {
  productId: string;
  productName: string;
  quantity?: number;
  price: number; // basicPrice
  discountUser: number;
  discountActual?: number;
  discountTax?: number;
  amount?: number;
  subTotal?: number;
  totalAmount?: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  active?: boolean; // help to perform iteration in orderitem total calculation
  gstPercentage?: number; // will get from product details
  gstIncluded: boolean; // will get from product details
  basicPriceTax: number; // will get from product details
  hsnCode?: string; // will get from product details

  sellingPrice: number;
  buyingPrice: number;
  margin: number;
}


export class OrganizationConfig {
  id?: string;
  orderConfig: {
    roundOff: number;
    estimatedDeliveryDays: number;
  };
  productConfig: {
    outOffStockCount: number;
    lowStockCount: number;
  };
  isStaffLoginEnabled: boolean;
  isCustomerLoginEnabled: boolean;
}

export class OrderChartData {
  orderDateToCountMap: {
    [key: string]: number;
  };
}
