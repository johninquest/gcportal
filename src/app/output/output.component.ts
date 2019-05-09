import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
/* import * as jsPDF from 'jspdf'; */
import { saveAs } from 'file-saver';
import * as moment from 'moment';
moment.locale('de');

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  oTitle: string = 'A FWS App'; showHide: boolean = false;
  trType: string; payMethod: string;
  brInfo: string; sgInfo: string;

  constructor() { }

  brNames: string; brPhone: string; brEmail: string;
  sgNames: string; sgPhone: string; sgEmail: string;
  trLogo: string; trDate: string; trPlace: string; trCountry: string;

  trItem1: string; trPrice1: number;
  trItem2: string; trPrice2: number;
  trItem3: string; trPrice3: number;
  trTotal: string; trCurrency: string;
  commaSpace: string;

  storedTrData: object = JSON.parse(sessionStorage.getItem('savedTrData'));

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
    let dateObj: object = JSON.parse(sessionStorage.getItem('savedTrData'));
    if (dateObj['tr_date']) {
      return moment(dateObj['tr_date']).format('LL'); // this.storedTrData['tr_date'];
    } else {
      return moment().format('LLL');
    }
  }

  // Display the transaction type on output template
  showTransactionType() {
    if (sessionStorage.getItem('dg_choice') === 'giveaway') {
      this.trType = 'Geschenk';
      this.payMethod = 'Kostenlos';
      this.brInfo = 'Empfänger';
      this.sgInfo = 'Geber';
    } else if (sessionStorage.getItem('dg_choice') === 'sale') {
      this.trType = 'Verkauf';
      this.payMethod = 'Bar';
      this.brInfo = 'Käufer';
      this.sgInfo = 'Verkäufer';
    }
  }

  trTotalCalculator() {
    let trType = sessionStorage.getItem('dg_choice');
    let priceObj: object = JSON.parse(sessionStorage.getItem('savedTrData')); 
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

  createImg() {
    let target = document.getElementById('invbox');
    let wt: string = '100%'; let ht: string = 'auto';
    html2canvas((target), {width: wt, height: ht}).then((canvas: any) => {
      
      let ctx = canvas.getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
      /* let outputedImg = window.open().document.write('<img src="' + imageGened + '" />');
      let outputedImg = window.open(imageGened, '_blank');
      let outputedImg = new Blob(imageGened, {type: 'image/png'}); */
      let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
      return saveAs(imageGened, `TN-${tnow}.PNG`); 
    });
  } 

  /* A4 Web Pixel dimension -> 595 X 842 pixels */ 
  /* createPdf() {
    // let elem = document.getElementById('invbox');
    // let imgData = html2canvas(elem).then(function(canvas: any) {canvas.toDataURL('image/jpeg')
    let doc = new jsPDF('p','mm','a4');
    doc.text(10, 10, 'Hello world!');
    //doc.output();
    doc.save('MyPOT.pdf');
  } */

  showCurrency() {
    let cCodeObj: object = JSON.parse(sessionStorage.getItem('savedTrData'));
    if(cCodeObj['tr_ccode']) {
      if (cCodeObj['tr_ccode'] === 'aus') {return 'AUD'}
      if (cCodeObj['tr_ccode'] === 'ago') {return 'AOA'}
      if (cCodeObj['tr_ccode'] === 'alb') {return 'ALL'}
      if (cCodeObj['tr_ccode'] === 'bgr') {return 'BGN'}
      if (cCodeObj['tr_ccode'] === 'bih') {return 'BAM'}
      if (cCodeObj['tr_ccode'] === 'bwa') {return 'BWP'}
      if (cCodeObj['tr_ccode'] === 'can') {return 'CAD'}
      if (cCodeObj['tr_ccode'] === 'che') {return 'CHF'}
      if (cCodeObj['tr_ccode'] === 'chn') {return 'CNY'}
      if (cCodeObj['tr_ccode'] === 'cze') {return 'CZK'}
      if (cCodeObj['tr_ccode'] === 'dnk') {return 'DKK'}
      if (cCodeObj['tr_ccode'] === 'dza') {return 'DZD'}
      if (cCodeObj['tr_ccode'] === 'egy') {return 'EGP'}
      if (cCodeObj['tr_ccode'] === 'gbr') {return 'GBP'}
      if (cCodeObj['tr_ccode'] === 'hrv') {return 'HRK'}
      if (cCodeObj['tr_ccode'] === 'hun') {return 'HUF'}
      if (cCodeObj['tr_ccode'] === 'ind') {return 'INR'}
      if (cCodeObj['tr_ccode'] === 'ken') {return 'KES'}
      if (cCodeObj['tr_ccode'] === 'lby') {return 'LYD'}
      if (cCodeObj['tr_ccode'] === 'mar') {return 'MAD'}
      if (cCodeObj['tr_ccode'] === 'mkd') {return 'MKD'}
      if (cCodeObj['tr_ccode'] === 'mrt') {return 'MRU'}
      if (cCodeObj['tr_ccode'] === 'mwi') {return 'MWK'}
      if (cCodeObj['tr_ccode'] === 'nga') {return 'NGN'}
      if (cCodeObj['tr_ccode'] === 'nor') {return 'NOK'}
      if (cCodeObj['tr_ccode'] === 'nzl') {return 'NZD'}
      if (cCodeObj['tr_ccode'] === 'pol') {return 'PLN'}
      if (cCodeObj['tr_ccode'] === 'rou') {return 'RON'}
      if (cCodeObj['tr_ccode'] === 'sdn') {return 'SDG'}
      if (cCodeObj['tr_ccode'] === 'swe') {return 'SEK'}
      if (cCodeObj['tr_ccode'] === 'uga') {return 'UGX'}
      if (cCodeObj['tr_ccode'] === 'zaf') {return 'ZAR'}
      if (cCodeObj['tr_ccode'] === 'zmb') {return 'ZMW'}
      if (cCodeObj['tr_ccode'] === 'zwe') {return 'ZWL'}
      if (cCodeObj['tr_ccode'] === 'usa') {return 'USD'}

      if ((cCodeObj['tr_ccode'] === 'caf') || (cCodeObj['tr_ccode'] === 'cmr') || 
         (cCodeObj['tr_ccode'] === 'cog') || (cCodeObj['tr_ccode'] === 'gab') ||
         (cCodeObj['tr_ccode'] === 'gnq') || (cCodeObj['tr_ccode'] === 'tcd')) 
         { return 'XAF'; }

      if ((cCodeObj['tr_ccode'] === 'ben') || (cCodeObj['tr_ccode'] === 'bfa') || 
         (cCodeObj['tr_ccode'] === 'civ') || (cCodeObj['tr_ccode'] === 'gnb') ||
         (cCodeObj['tr_ccode'] === 'mli') || (cCodeObj['tr_ccode'] === 'ner') || 
         (cCodeObj['tr_ccode'] === 'sen') || (cCodeObj['tr_ccode'] === 'tgo')) 
         { return 'XOF'; } 

      else { return 'EUR'; }

    } else { return ''; }
  } 

  showCountry() {
    let cObj: object = JSON.parse(sessionStorage.getItem('savedTrData'));
    if(cObj['tr_ccode']) {
      return cObj['tr_ccode'];
    } else { return ''; }
  }

  cSpace() {
    let locationObj: object = JSON.parse(sessionStorage.getItem('savedTrData'));
    if (locationObj['tr_location'] && locationObj['tr_ccode']) {
      return ', ';
    }
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
