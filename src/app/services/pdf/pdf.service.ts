import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Order } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';
import { CommonUtils } from 'src/app/modules/utils/common.utils';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { getDocumentContent } from './pdf-layout-definition';

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  pdfObj = null;

  constructor(
    // private _emailService: EmailService,
    // private _customToastCtrl: CustomToastController
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  generateInvoice(
    order: Order,
    sellerOrganization: Organization,
    buyer: Customer,
    action: 'open' | 'print' | 'download' | 'email' = 'open'
  ) {
    const documentContent = getDocumentContent(
      order,
      sellerOrganization,
      buyer);

    const fileName = sellerOrganization.companyName + '_' + CommonUtils.getCurrentDateWithMomentFormat(new Date());

    switch (action) {
      case 'open':
        pdfMake.createPdf(documentContent).open();
        break;
      case 'print':
        pdfMake.createPdf(documentContent).print();
        break;
      case 'download':
        pdfMake.createPdf(documentContent).download(fileName);
        break;
      // case 'email':
      //   this.triggerEmail(documentContent, fileName, order, buyer, sellerOrganization);
      //   break;
      default:
        pdfMake.createPdf(documentContent).open();
        break;
    }
  }


  // private triggerEmail(
  //   documentContent,
  //   fileName: string,
  //   order: Order,
  //   buyer: Customer,
  //   sellerOrganization: Organization
  // ) {
  //   pdfMake.createPdf(documentContent).getBlob(blob => {
  //     this._emailService.sendEmailWithPdf(blob, fileName, order, buyer, sellerOrganization).subscribe(res => {
  //       this._customToastCtrl.presentToast(OrderConstant.SUCCESS_EMAIL_SENDING);
  //     }, error => {
  //       this._customToastCtrl.presentToast(OrderConstant.ERR_EMAIL_SENDING);
  //     });
  //   });

  // }
}
