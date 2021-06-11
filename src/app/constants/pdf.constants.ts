import { Content } from 'pdfmake/interfaces';

// Constants file for pdf service
const pdfConstants = {
  AMOUNT_IN_WORDS_LABEL: 'Amount in words:',
  AUTHORIZED_SIGNATURE_LABEL: 'Authorized Signature',
  BILLING_FROM_LABEL: 'Bill From:',
  BILLING_TO_LABEL: 'Bill To:',
  CUSTOMER_SIGNATURE_LABEL: 'Customer’s Signature',
  DELIVERED_DATE_LABEL: 'Delivered Date',
  EMAIL_LABEL: 'E-mail :',
  GST_NUMBER_LABEL: 'GSTIN/UIN :',
  INVOICE_NUMBER_LABEL: 'Invoice Number',
  INVOICE_TITLE: 'INVOICE',
  ORDER_TOTAL_LABEL: 'Total',
  ORDERED_DATE_LABEL: 'Ordered Date',
  PHONE_NUMBER_LABEL: 'Phone :',
  PHONE_NUMBER_PREFIX: '+91',
  REFERENCE_LABEL: 'Reference',
  DEFAULT_FILE_NAME: 'invoice',
};

// Array containing the width of the orders table.
const orderTableWidth: string[] = [
  'auto', // 1. s.no
  'auto', // 2. hsn
  'auto', // 3. gst percentage
  '*', // 4. product name
  'auto', // 5. base price
  'auto', // 6. qty
  'auto', // 7. discount
  'auto', // 8. taxable price
  'auto', // 9. cgst
  'auto', // 10. sgst
  'auto', // 11. igst
  'auto', // 12. total amounnt
];

// Array containing the headers of the orders table.
const orderTableHeader: Content[] = [
  'S. No',
  'HSN Code',
  'Gst %',
  'Product Name',
  'Price',
  'Qty',
  'Discount',
  {
    columns: [
      [
        {
          text: 'Taxable',
          style: 'text-align-center',
        },
        {
          text: 'Price',
          style: 'text-align-center',
        },
      ],
    ],
  },
  'CGST',
  'SGST',
  'IGST',
  {
    columns: [
      [
        {
          text: 'Total',
          style: 'text-align-center',
        },
        {
          text: 'Amount',
          style: 'text-align-center',
        },
      ],
    ],
  },
];

// export interface IDummyOrganization {
//   companyName: string;
//   gstNumber?: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   pincode: string;
//   phoneNumber: string;
//   email?: string;
// }

// const sellerOrganization: IDummyOrganization = {
//   companyName: 'Creative Power',
//   gstNumber: '33AKLPA9224B1ZO',
//   addressLine1: '3, Annai Sathiya Street',
//   addressLine2: 'Rajiv Gandhi Nagar, Alapakkam',
//   city: 'Chennai',
//   state: 'Tamil Nadu',
//   pincode: '600087',
//   phoneNumber: '1231231234',
//   email: 'creativepower@gmail.com',
// };

// const buyerOrganization: IDummyOrganization = {
//   companyName: 'GYS Organization',
//   gstNumber: '33AKLAS7324B1ZO',
//   addressLine1: '32, Perumal Street',
//   addressLine2: 'Tower Park Nagar',
//   city: 'Chennai',
//   state: 'Tamil Nadu',
//   pincode: '600147',
//   phoneNumber: '9988776655',
// };

export {
  pdfConstants,
  orderTableHeader,
  orderTableWidth
};
