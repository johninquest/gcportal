import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import moment from 'moment';
moment.locale('en-gb');

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() {}

  ticketToImage(ticketDiv: any) {
    html2canvas(ticketDiv)
    .then((canvas: any) => {      
      let ctx = canvas.getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas.toDataURL('image/jpeg', 1.0).replace('image/png', 'image/octet-stream');
      let datetimeNow: string = moment().format('YYYYMMDDTHHmmss');
      let finalJPEG = saveAs(imageGened, `TN-${datetimeNow}.JPEG`);
      return finalJPEG; // saveAs(imageGened, `TN-${datetimeNow}.JPEG`); 
    });
  }

  ticketToPDF(ticketData: object) {

    let from: string = ticketData['fromLocation'].toUpperCase(),
        to: string = ticketData['toLocation'].toUpperCase(), 
        fee: string = ticketData['tkFee'].toString(), 
        ownername: string = ticketData['ownerName'].toUpperCase(), 
        ownerid: string = ticketData['ownerId'].toUpperCase(),
        ticketnr: string = ticketData['tkNumber'].toString(); 
    let datetimeOnPdf = moment().format('LLL');    

    let doc = new jsPDF();
    doc.text(datetimeOnPdf, 100, 90);
    doc.text(from, 100, 100);
    doc.text(to, 100, 110);
    doc.text(fee, 100, 120);
    doc.text(ownername, 100, 130);
    doc.text(ownerid, 100, 140);
    doc.text(ticketnr, 100, 150);
    let datetimeNow: string = moment().format('YYYYMMDDTHHmmss');
    let finalPDF = doc.save(`TN-${datetimeNow}.PDF`);
    return finalPDF;
  }
  
}