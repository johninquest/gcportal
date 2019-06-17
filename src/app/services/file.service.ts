import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
moment.locale('de');

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  createImg() {
    let target = document.getElementById('canvas-box');
    // let wt: string = '100%'; let ht: string = 'auto';
    let wt = innerWidth; let ht = innerHeight;
    html2canvas((target), {width: wt, height: ht }).then((canvas: any) => {
      
      let ctx = canvas.getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
      let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
      return saveAs(imageGened, `TN-${tnow}.PNG`); 
    });
   }

  createPdf() {
    let sTrData: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    let doc = new jsPDF('p','mm','a4');
    if (sTrData) {
      doc.text(10, 40, sTrData['sg_names']);
      doc.text(10, 45, sTrData['sg_phone']);
      doc.text(10, 50, sTrData['sg_email']);

      doc.text(130, 40, sTrData['br_names']);
      doc.text(130, 45, sTrData['br_phone']);
      doc.text(130, 50, sTrData['br_email']);
    } else {
      doc.text(50, 50, 'Nichts da!');
    }
    //doc.output();
    let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
    doc.save(`TN-${tnow}.PDF`);
  }

}