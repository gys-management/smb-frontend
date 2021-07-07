import * as moment from 'moment';
import { TDocumentDefinitions, Content, Column } from 'pdfmake/interfaces';
import { numberToWords } from 'number-to-words';

import { Customer } from 'src/app/models/customer.model';
import { Order, OrderItem } from 'src/app/models/order.model';
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
  generateOrderDetailsData
} from './pdf-generic-layout-definition';

const getTemplate2DocumentContent = (
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
      // Heading
      {
        margin: [0, 0, 0, 10],
        text: INVOICE_TITLE,
        style: 'text-align-center',
      },

      // Content 1 - Table
      // Displays company logo and From address.
      {
        table: {
          widths: [...createWidthArray(2, IWidthType.STAR)],
          body: [
            // Row 1 - Displays company logo and From address.
            [
              // Column 1 - Company logo.
              {
                border: [false, false],
                // TODO: TO BE REPLACED BY THE LOGO
                text: 'To Be Replaced by the Logo'
              },
              // Column 2 - From Address.
              {
                border: [false, false],
                style: 'text-align-right',
                columns: [
                  [
                    {
                      text: BILLING_FROM_LABEL,
                    },
                    ...generateOrganizationAddressData(sellerOrganization),
                  ],
                ],
              },
            ],
          ],
        },
      },

      // Content 2 - Displays the Customer Address and order meta data like order number and order date.
      {
        margin: [5, 20],
        columns: [
          [
            {
              text: BILLING_TO_LABEL,
            },
            ...generateOrganizationAddressData(buyer)
          ],
          [
            {
              layout: 'noBorders',
              table: {
                widths: [...createWidthArray(2, IWidthType.STAR)],
                body: [
                  // Row 1 - Contains invoice number.
                  [
                    // Invoice Number label and value.
                    {
                      text: INVOICE_NUMBER_LABEL + ':',
                      style: 'text-align-right',
                    },
                    {
                      text: invoiceNumber,
                    },
                  ],
                  // Row 2 - Contains Order Date
                  [
                    // Ordered Date label and value.
                    {
                      text: ORDERED_DATE_LABEL + ':',
                      style: 'text-align-right',
                    },
                    {
                      text: moment(orderedDate).format('DD/MM/YYYY'),
                    },
                  ],
                  [
                    // Reference label and value
                    {
                      text: REFERENCE_LABEL + ':',
                      style: 'text-align-right',
                    },
                    {
                      text: reference,
                    },
                  ],
                ],
              }
            }
          ]
        ]
      },


      // Content 3 - Table to iterate and print the order items and its total.
      {
        margin: [0, 10],
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
          layout: 'noBorders',
          table: {
            widths: [...createWidthArray(1, IWidthType.STAR)],
            body: [
              [
                {
                  text: AUTHORIZED_SIGNATURE_LABEL,
                  margin: [0, 55, 8, 0],
                  style: 'text-align-right',
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
  NO_TOP_BOTTOM_TABLE_BORDER, ORDER_ITEM_TABLE_LAYOUT, getTemplate2DocumentContent
};
