import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
moment.locale('de');

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  createImg() { }

  createPdf() {
    let doc = new jsPDF('p','mm','a4');
    doc.text(10, 10, 'Hello world!');
    //doc.output();
    let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
    doc.save(`TN-${tnow}.PDF`);
  }

}
