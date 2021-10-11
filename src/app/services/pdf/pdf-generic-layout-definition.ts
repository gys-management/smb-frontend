import { ContentTable, CustomTableLayout, Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Customer } from 'src/app/models/customer.model';
import { Order, OrderItem } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { IWidthType } from 'src/app/models/pdf.model';
import { getTemplate1DocumentContent } from './pdf-template1-layout-definition';
import { getTemplate2DocumentContent } from './pdf-template2-layout-definition';


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

const NO_TOP_TABLE_BORDER: CustomTableLayout = {
  hLineWidth: (rowIndex: number, node: ContentTable) => {
    // Avoiding horizontal border for the first and last row of the table.
    // NOTE: If there are 5 rows in a table, there will be 6 horizontal lines.
    // 0 being the table's top most border
    // 6 being the table's bottom most border
    if (rowIndex === 0) {
      return 0;
    } else {
      return 1;
    }
  },
};

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

// TODO: Fetch the pdf template preference from backend
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const orgPdfTemplatePreference: string = 'template2';
const getDocumentContent = async (
  order: Order,
  sellerOrganization: Organization,
  buyer: Customer
): Promise<TDocumentDefinitions> => {
  let documentContent: TDocumentDefinitions;
  switch (orgPdfTemplatePreference) {
    case 'template1':
      documentContent = getTemplate1DocumentContent(order, sellerOrganization, buyer);
      break;
    case 'template2':
      documentContent = await getTemplate2DocumentContent(order, sellerOrganization, buyer);
      break;
  };

  return documentContent;
};

export {
  NO_TOP_BOTTOM_TABLE_BORDER,
  NO_TOP_TABLE_BORDER,
  inrFormatter,
  convertToInrString,
  createWidthArray,
  createDummyData,
  getDocumentContent
};
