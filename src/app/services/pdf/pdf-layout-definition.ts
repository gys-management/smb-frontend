import * as moment from 'moment';
import { CustomTableLayout, ContentTable } from 'pdfmake/interfaces';
import { TDocumentDefinitions, Content, Column } from 'pdfmake/interfaces';
import { numberToWords } from 'number-to-words';

import { Customer } from 'src/app/models/customer.model';
import { Order, OrderItem } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { IWidthType } from 'src/app/models/pdf.model';
import { pdfConstants, orderTableWidth, orderTableHeader } from 'src/app/constants/pdf.constants';

const NO_TOP_BOTTOM_TABLE_BORDER: CustomTableLayout = {
  hLineWidth: (rowIndex: number, node: ContentTable) => {
    // Avoiding horizontal border for the first and last row of the table.
    // NOTE: If there are 5 rows in a table, there will be 6 horizontal lines.
    // 0 being the table's top most border
    // 6 being the table's bottom most border
    if (rowIndex === 0 || rowIndex === node.table.body.length) {
      return 0;
    } else {
      return 1;
    }
  },
};

const ORDER_ITEM_TABLE_LAYOUT: CustomTableLayout = {
  hLineWidth: (rowIndex: number, node: ContentTable, colIndex: number) => {
    // Displaying the horizontal line only around the headers and for the table bottom outline.
    if (
      rowIndex === 0 ||
      rowIndex === 1 ||
      (rowIndex >= node.table.body.length - 2 &&
        rowIndex !== node.table.body.length)
    ) {
      return 1;
    } else {
      return 0;
    }
  },
  paddingBottom: (rowIndex: number, node: any, colIndex: number) => {
    const DEFAULT_PADDING = 2;
    // The content height is static.
    const ORDER_TOTAL_DISPLAY_ROW_HEIGHT = 15.5;

    // Calculating height for the last order item.
    // NOTE: length - 1 gives the last element of the table.
    // But instead -3 is used to neglect the two rows displaying the order total.
    if (rowIndex === node.table.body.length - 3) {
      const currentPosition = node.positions[node.positions.length - 1];
      const totalPageHeight = currentPosition.pageInnerHeight;
      const currentHeight = currentPosition.top;
      const paddingBottom = totalPageHeight - currentHeight - ORDER_TOTAL_DISPLAY_ROW_HEIGHT;
      return paddingBottom;
    } else {
      return DEFAULT_PADDING;
    }
  },
};

const getDocumentContent = (
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

  // Formatter used to convert amount to proper INR format.
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });

  // Function to convert amount to proper INR format.
  const convertToInrString = (val: number) => inrFormatter.format(val);

  // Function to generate auto width array for the given count.
  const createWidthArray = (count: number, type: IWidthType): string[] => {
    const widthArray: string[] = [];

    for (let i = 0; i < count; i++) {
      if (type === IWidthType.STAR) {
        widthArray.push('*');
      } else if (type === IWidthType.AUTO) {
        widthArray.push('auto');
      }
    }
    return widthArray;
  };

  // Function to create dummy data. i.e., create an object with empty text.
  const createDummyData = (count: number): Content[] => {
    const dummyTableCells: Content[] = [];

    for (let i = 0; i < count; i++) {
      dummyTableCells.push({ text: '' });
    }
    return dummyTableCells;
  };

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

  // Function to generate the data to be populated in orders table.
  const generateOrderDetailsData = ({ orderItems }: Order): any[][] =>
    orderItems.map((item: OrderItem, index) => [
      index + 1,
      { text: `${item.hsnCode}`, style: 'text-align-center' },
      { text: `${item.gstPercentage}%`, style: 'text-align-center' },
      item.productName,
      { text: convertToInrString(item.price), style: 'text-align-right' },
      { text: item.quantity, style: 'text-align-center' },
      { text: convertToInrString(item.discountActual), style: 'text-align-right' },
      { text: convertToInrString(item.subTotal), style: 'text-align-right' },
      { text: convertToInrString(item.cgstAmount), style: 'text-align-right' },
      { text: convertToInrString(item.sgstAmount), style: 'text-align-right' },
      { text: convertToInrString(item.igstAmount), style: 'text-align-right' },
      { text: convertToInrString(item.totalAmount), style: 'text-align-right' },
    ]);

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
  NO_TOP_BOTTOM_TABLE_BORDER, ORDER_ITEM_TABLE_LAYOUT, getDocumentContent
};
