import { ContentTable, CustomTableLayout, Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { Customer } from "src/app/models/customer.model";
import { Order, OrderItem } from "src/app/models/order.model";
import { Organization } from "src/app/models/organization.model";
import { IWidthType } from "src/app/models/pdf.model";
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

const ORDER_ITEM_TABLE_LAYOUT: CustomTableLayout = {
    hLineWidth: (rowIndex: number, node: ContentTable, colIndex: number) => {
        // Displaying the horizontal line only around the headers and for the table bottom outline.
        if (
            rowIndex === 0 ||
            rowIndex === 1 ||
            (rowIndex >= node.table.body.length - 2)
        ) {
            return 1;
        } else {
            return 0;
        }
    },
    paddingBottom: (rowIndex: number, node: any, colIndex: number) => {
        const DEFAULT_PADDING = 2;
        // The content height is static.
        const ORDER_TOTAL_DISPLAY_ROW_HEIGHT = 16.5;

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

// Function to generate the data to be populated in orders table.
const generateOrderDetailsData = ({ orderItems }: Order): any[][] => {
    return orderItems.map((item: OrderItem, index) => [
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
}

// TODO: Fetch the pdf template preference from backend
const orgPdfTemplatePreference: string = 'template2';
const getDocumentContent = (
    order: Order,
    sellerOrganization: Organization,
    buyer: Customer
  ): TDocumentDefinitions => {
    let documentContent: TDocumentDefinitions;
    switch(orgPdfTemplatePreference) {
        case 'template1':
            documentContent = getTemplate1DocumentContent(order, sellerOrganization, buyer);
            break;
        case 'template2': 
            documentContent = getTemplate2DocumentContent(order, sellerOrganization, buyer);
            break;
    };

    return documentContent;
}

export {
    NO_TOP_BOTTOM_TABLE_BORDER,
    NO_TOP_TABLE_BORDER,
    ORDER_ITEM_TABLE_LAYOUT,
    inrFormatter,
    convertToInrString,
    createWidthArray,
    createDummyData,
    generateOrderDetailsData,
    getDocumentContent
}