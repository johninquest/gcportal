import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import moment from 'moment';

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
      return saveAs(imageGened, `TN-${datetimeNow}.JPEG`); 
    });
  }

  ticketToPDF(ticketData: object) {
    // console.log(ticketData);
    let doc = new jsPDF();
    doc.text(ticketData['fromLocation'], 100, 100);
    doc.text(ticketData['toLocation'], 100, 110);
    doc.text(ticketData['fee'].toString(), 100, 120);
    doc.text(ticketData['ownerName'], 100, 130);
    doc.text(ticketData['ownerId'].toUpperCase(), 100, 140);
    doc.text(ticketData['ticketNumber'].toString(), 100, 150);
    let datetimeNow: string = moment().format('YYYYMMDDTHHmmss');
    let finalPDF = doc.save(`TN-${datetimeNow}.PDF`);
    return finalPDF;
  }
  
}

// https://hackernoon.com/generating-pdfs-in-javascript-for-fun-and-profit-c7af594cf697
// https://www.positronx.io/angular-pdf-tutorial-export-pdf-in-angular-with-jspdf/

