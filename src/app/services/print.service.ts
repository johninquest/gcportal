import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
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
      let timeNow: string = moment().format('YYYYMMDDTHHmmss');
      return saveAs(imageGened, `TN-${timeNow}.JPEG`); 
    });
  }

  ticketToPDF(ticketData: object) {
    console.log(ticketData);
  }
  
}
