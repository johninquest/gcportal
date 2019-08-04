import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import moment from 'moment';
import { FileService } from '../services/file.service'
import { from } from 'rxjs';
import { element } from 'protractor';
moment.locale('de');


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  oTitle: string = 'a stuuur app'; showHide: boolean = false;
  trType: string; payMethod: string;
  brInfo: string; sgInfo: string;

  constructor(public md: MatDialog, private fs: FileService) { }

  brNames: string; brPhone: string; brEmail: string;
  sgNames: string; sgPhone: string; sgEmail: string;
  trLogo: string; trDate: string; trPlace: string; trCountry: string;

  trItem1: string; trPrice1: number;
  trItem2: string; trPrice2: number;
  trItem3: string; trPrice3: number;
  trTotal: string; trCurrency: string;
  commaSpace: string;

  storedTrData: object = JSON.parse(sessionStorage.getItem('savedInputData'));

  // due_date: string;

  getValuesFromSS() {
    if (this.storedTrData) {
      this.brNames = this.storedTrData['br_names'];
      this.brPhone = this.storedTrData['br_phone'];
      this.brEmail = this.storedTrData['br_email'];
      this.sgNames = this.storedTrData['sg_names'];
      this.sgPhone = this.storedTrData['sg_phone'];
      this.sgEmail = this.storedTrData['sg_email'];
      this.trPlace = this.storedTrData['tr_location'];
      this.trItem1 = this.storedTrData['tr_item1'];
      this.trItem2 = this.storedTrData['tr_item2'];
      this.trItem3 = this.storedTrData['tr_item3'];
    } else {
      this.brNames = ''; this.brPhone = ''; this.brEmail = '';
      this.sgNames = ''; this.sgPhone = ''; this.sgEmail = '';
      this.trPlace = '';
      this.trItem1 = ''; this.trItem2 = ''; this.trItem3 = '';
    }
  }

  // Returns stored date or returns current date if user doesn't input a date
  showDate() {
    let dateObj: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    if (dateObj['tr_date']) {
      return moment(dateObj['tr_date']).format('LL'); // this.storedTrData['tr_date'];
    } else {
      return moment().format('LLL');
    }
  }

  // Display the transaction type on output template
  showTransactionType() {
    if (sessionStorage.getItem('dgChoice') === 'giveaway') {
      this.trType = 'Giveaway';
      this.payMethod = 'Free';
      this.brInfo = 'Receiver';
      this.sgInfo = 'Giver';
    } else if (sessionStorage.getItem('dgChoice') === 'sale') {
      this.trType = 'Sale';
      this.payMethod = 'Cash';
      this.brInfo = 'Buyer';
      this.sgInfo = 'Seller';
    }
  }

  trTotalCalculator() {
    let trType = sessionStorage.getItem('dgChoice');
    let priceObj: object = JSON.parse(sessionStorage.getItem('savedInputData')); 
    if (trType === 'giveaway') {
      this.trPrice1 = 0;
      this.trPrice2 = 0;
      this.trPrice3 = 0;
      this.trTotal = (this.trPrice1 + this.trPrice2 + this.trPrice3).toString();
    } else if (trType === 'sale') {
      if (priceObj['tr_price1'] === 'NaN') {
        this.trPrice1 = 0;
      } else {
        this.trPrice1 = Number(priceObj['tr_price1']);
      }
      if (priceObj['tr_price2'] === 'NaN') {
        this.trPrice2 = 0;
      } else {
        this.trPrice2 = Number(priceObj['tr_price2']);
      }
      if (priceObj['tr_price3'] === 'NaN') {
        this.trPrice3 = 0;
      } else {
        this.trPrice3 = Number(priceObj['tr_price3']);
      }
      this.trTotal = (this.trPrice1 + this.trPrice2 + this.trPrice3).toFixed(2);
    }
  }

  showImg() { 
    let elem: HTMLElement = document.getElementById('canvas-box');
    this.fs.createImg(elem); 
    // this.fs.createDmg(elem);
  }

  showPdf() { 
    this.fs.createPdf(); 
  }

  /* A4 Web Pixel dimension -> 595 X 842 pixels */ 
  showCurrency() {
    let cCodeObj: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    if(cCodeObj['tr_ccode']) {

      if ((cCodeObj['tr_ccode'] === 'ch') || (cCodeObj['tr_ccode'] === 'li')) 
         { return 'CHF'; } 

      else { return 'EUR'; }

    } else { return ''; }
  } 

  showCountry() {
    let cObj: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    if(cObj['tr_ccode']) {
      if (cObj['tr_ccode'] === 'at') { return 'Austria' }
      if (cObj['tr_ccode'] === 'be') { return 'Belgium' }
      if (cObj['tr_ccode'] === 'ch') { return 'Switzerland' }
      if (cObj['tr_ccode'] === 'de') { return 'Germany' }
      if (cObj['tr_ccode'] === 'li') { return 'Liechtenstein' }
      if (cObj['tr_ccode'] === 'lu') { return 'Luxembourg' }
      /* return cObj['tr_ccode']; */
    } else { return ''; }
  }

  cSpace() {
    let locationObj: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    if (locationObj['tr_location'] && locationObj['tr_ccode']) {
      return ', ';
    }
  }

  deleteData() {
    this.md.open(DeletedialogComponent);    
  }
  
  /* Called whenever component newly loads */
  ngOnInit() {
    this.showTransactionType();
    this.trDate = this.showDate();
    this.trTotalCalculator();
    this.getValuesFromSS();
    this.trCurrency = this.showCurrency();
    this.trCountry = this.showCountry();
    this.commaSpace = this.cSpace();
    /* this.due_date = moment(this.tr_date1, 'll').add(7, 'days').format('ll'); */
  }

}
