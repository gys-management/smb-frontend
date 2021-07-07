import * as moment from 'moment';
import { TDocumentDefinitions, Content, Column } from 'pdfmake/interfaces';
import { numberToWords } from 'number-to-words';

import { Customer } from 'src/app/models/customer.model';
import { Order } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { IWidthType } from 'src/app/models/pdf.model';
import { pdfConstants, orderTableWidth, orderTableHeader } from 'src/app/constants/pdf.constants';

import {
  NO_TOP_BOTTOM_TABLE_BORDER,
  ORDER_ITEM_TABLE_LAYOUT,
  inrFormatter,
  convertToInrString,
  createWidthArray,
  createDummyData,
  generateOrderDetailsData,
  NO_TOP_TABLE_BORDER
} from './pdf-generic-layout-definition';

const getTemplate1DocumentContent = (
  order: Order,
  sellerOrganization: Organization,
  buyer: Customer
): TDocumentDefinitions => {
  // Destructuring pdf constants.
  const {
    AMOUNT_IN_WORDS_LABEL,
    AUTHORIZED_SIGNATURE_LABEL,
    BILLING_FROM_LABEL,
    BILLING_TO_LABEL,
    CUSTOMER_SIGNATURE_LABEL,
    DELIVERED_DATE_LABEL,
    EMAIL_LABEL,
    GST_NUMBER_LABEL,
    INVOICE_NUMBER_LABEL,
    INVOICE_TITLE,
    ORDER_TOTAL_LABEL,
    ORDERED_DATE_LABEL,
    PHONE_NUMBER_LABEL,
    PHONE_NUMBER_PREFIX,
    REFERENCE_LABEL,
  } = pdfConstants;

  // Destructuring required order data.
  const {
    invoiceNumber,
    orderedDate,
    reference,
    deliveredDate,
    igstAmount,
    cgstAmount,
    sgstAmount,
    subTotal,
    finalAmount,
  } = order;

  // Function to generate the organization data to be displayed from the organization object.
  const generateOrganizationAddressData = ({
    companyName,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    phoneNumber,
    gstNumber,
    email,
  }: any): Column[] => {
    const columns: Column[] = [
      {
        text: companyName.toUpperCase(),
        style: 'company-name',
      },
      {
        text: addressLine1,
      },
      {
        text: addressLine2,
      },
      {
        text: `${city}, ${state} - ${pincode}.`,
      },
      {
        text: `${PHONE_NUMBER_LABEL} ${PHONE_NUMBER_PREFIX} ${phoneNumber}`,
      },
      email && {
        text: `${EMAIL_LABEL} ${email}`,
      },
      gstNumber && {
        text: `${GST_NUMBER_LABEL} ${gstNumber}`,
      },
    ];

    // Return column array containing organization details.
    return columns;
  };



  // Return the actual content to form the PDF.
  return {
    pageMargins: [20, 30, 20, 100],
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Content 1 - Table
      // Displays the Pdf Title, From/To address and order meta data.
      {
        table: {
          widths: [...createWidthArray(2, IWidthType.STAR)],
          body: [
            // Row 1 - Displays the bill heading
            [
              {
                text: INVOICE_TITLE,
                colSpan: 2,
                style: 'text-align-center',
              },
              ...createDummyData(1),
            ],
            // Row 2 - Displays From/To address.
            [
              // Column 1 - From Address.
              {
                columns: [
                  [
                    {
                      text: BILLING_FROM_LABEL,
                    },
                    ...generateOrganizationAddressData(sellerOrganization),
                  ],
                ],
              },
              // Column 2 - To Address.
              {
                columns: [
                  [
                    {
                      text: BILLING_TO_LABEL,
                    },
                    ...generateOrganizationAddressData(buyer),
                  ],
                ],
              },
            ],
          ],
        },
      },

      // Content 2 - Displays order meta data like order number and order date.
      {
        layout: NO_TOP_BOTTOM_TABLE_BORDER,
        table: {
          widths: [...createWidthArray(4, IWidthType.STAR)],
          body: [
            // Row 1 - Contains invoice number and ordered date.
            [
              // Invoice Number label and value.
              {
                text: INVOICE_NUMBER_LABEL,
                border: [true, true, true, true],
              },
              {
                text: invoiceNumber,
              },
              // Ordered Date label and value.
              {
                text: ORDERED_DATE_LABEL,
              },
              {
                text: moment(orderedDate).format('DD/MM/YYYY'),
              },
            ],
            // Row 2 - Contains reference number and delivered date
            [
              // Reference label and value
              {
                text: REFERENCE_LABEL,
              },
              {
                text: reference,
              },
              // Delivered Date label and value
              {
                text: DELIVERED_DATE_LABEL,
              },
              {
                text: deliveredDate !== null ? moment(deliveredDate).format('DD/MM/YYYY') : '',
              },
            ],
          ],
        },
      },

      // Content 3 - Table to iterate and print the order items and its total.
      {
        margin: 0,
        layout: ORDER_ITEM_TABLE_LAYOUT,
        table: {
          widths: orderTableWidth,
          headerRows: 1,
          body: [
            [...orderTableHeader],

            // As the method returns any[][], spreading the result leads to 1D array.
            // The pdf creator interprets 1D array as row and values inside it as columns.
            ...generateOrderDetailsData(order),

            // Row to display the total.
            [
              {
                text: ORDER_TOTAL_LABEL,
                colSpan: '7',
                style: 'text-align-right',
              },
              ...createDummyData(6),
              convertToInrString(subTotal),
              convertToInrString(cgstAmount),
              convertToInrString(sgstAmount),
              convertToInrString(igstAmount),
              {
                text: convertToInrString(finalAmount),
                // Setting the bottom border of the table cell to false.
                border: [true, true, true, false],
              },
            ],

            // Row to display the amount in words.
            [
              {
                // Convert the number to text
                text: `${AMOUNT_IN_WORDS_LABEL} ${numberToWords.toWords(finalAmount).toUpperCase()}`,
                colSpan: 11,
              },
              ...createDummyData(10),
              {
                text: '',
                // Setting the top border of the table cell to false.
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
    ],

    // Footer content.
    footer: (
      currentPage: number,
      pageCount: number,
    ): Content | null | undefined => {
      // Printing the footer only at the last page.
      if (currentPage === pageCount) {
        // Footer content - Signature of the organization and customer.
        const footerContent: Content = {
          margin: [20, 0],
          layout: NO_TOP_TABLE_BORDER,
          table: {
            widths: [...createWidthArray(2, IWidthType.STAR)],
            body: [
              [
                {
                  text: CUSTOMER_SIGNATURE_LABEL,
                  margin: [2, 48, 0, 0],
                },
                {
                  columns: [
                    [
                      {
                        text: `For ${sellerOrganization.companyName.toUpperCase()}`,
                        margin: [0, 0, 2, 35],
                        style: 'text-align-right',
                      },
                      {
                        text: AUTHORIZED_SIGNATURE_LABEL,
                        margin: [0, 0, 2, 8],
                        style: 'text-align-right',
                      },
                    ],
                  ],
                },
              ],
            ],
          },
        };
        return footerContent;
      }
    },

    // Style definition for the pdf.
    styles: {
      'company-name': {
        bold: true,
        fontSize: 10,
      },
      'order-table-header': {
        bold: true,
        fontSize: 9,
      },
      'text-align-right': {
        alignment: 'right',
      },
      'text-align-center': {
        alignment: 'center',
      },
    },
  };
};



// Export.
export {
  NO_TOP_BOTTOM_TABLE_BORDER, ORDER_ITEM_TABLE_LAYOUT, getTemplate1DocumentContent
};
