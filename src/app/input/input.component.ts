import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { COUNTRYCODES } from '../countrycodes';
import { from } from 'rxjs';
 
/* See the Moment.js docs for the meaning of these formats:
 https://momentjs.com/docs/#/displaying/format */
export const MY_FORMATS = {
  parse: { dateInput: 'll', },
  display: { dateInput: 'LL', },
};

/* Country code list descriptor */
export interface cCodeDesc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class InputComponent implements OnInit {

  title: string = 'a stuuur app';
  showHide: boolean = false;

  trType: string;
  brInfo: string;
  sgInfo: string;

  trItem1 = new FormControl('', [Validators.required]); trPrice1 = new FormControl('');
  trItem2 = new FormControl(''); trPrice2 = new FormControl('');
  trItem3 = new FormControl(''); trPrice3 = new FormControl('');

  trDate = new FormControl(''); trLoc = new FormControl(''); trCountry = new FormControl('');
  cCodes: cCodeDesc[] = COUNTRYCODES;
  
  sgNames = new FormControl(''); sgPhone = new FormControl(''); sgEmail = new FormControl('', [Validators.email]);
  brNames = new FormControl(''); brPhone = new FormControl(''); brEmail = new FormControl('', [Validators.email]);

  priceInput: boolean;
  storedTrDataObj: object = JSON.parse(sessionStorage.getItem('savedInputData'));

  saveTrData() {
    const trDataObj: object = { 'tr_item1' : this.trItem1.value, 'tr_price1' : this.trPrice1.value,
                        'tr_item2' : this.trItem2.value, 'tr_price2' : this.trPrice2.value,
                        'tr_item3' : this.trItem3.value, 'tr_price3' : this.trPrice3.value,
                        'tr_date' : this.trDate.value, 'tr_ccode' : this.trCountry.value, 'tr_location' : this.trLoc.value,
                        'sg_names' : this.sgNames.value, 'sg_phone' : this.sgPhone.value, 'sg_email' : this.sgEmail.value,
                        'br_names' : this.brNames.value, 'br_phone' : this.brPhone.value, 'br_email' : this.brEmail.value };
    let trDataStr: string = JSON.stringify(trDataObj);
    sessionStorage.setItem('savedInputData', trDataStr);
    /* console.log(trDataStr) */
  }

  displayTrType() {
    let trChoice: string = sessionStorage.getItem('dgChoice');
    if (trChoice === 'giveaway') {
      this.trType = 'Transaktionsdaten';
      this.brInfo = 'Empfängerdaten';
      this.sgInfo = 'Geberdaten';
    } else if (trChoice === 'sale') {
      this.trType = 'Transaktionsdaten';
      this.brInfo = 'Käuferdaten';
      this.sgInfo = 'Verkäuferdaten';
    } else {
      this.trType = '';
      this.brInfo = '';
      this.sgInfo = '';
    }
  }

  getStoredTrData() {
    if (this.storedTrDataObj) {
      this.trItem1.setValue(this.storedTrDataObj['tr_item1']); 
      this.trPrice1.setValue(this.storedTrDataObj['tr_price1']);
      this.trItem2.setValue(this.storedTrDataObj['tr_item2']);
      this.trPrice2.setValue(this.storedTrDataObj['tr_price2']);
      this.trItem3.setValue(this.storedTrDataObj['tr_item3']);
      this.trPrice3.setValue(this.storedTrDataObj['tr_price3']);
      this.trDate.setValue(this.storedTrDataObj['tr_date']);
      this.trLoc.setValue(this.storedTrDataObj['tr_location']);
      this.trCountry.setValue(this.storedTrDataObj['tr_ccode']);
      this.sgNames.setValue(this.storedTrDataObj['sg_names']);
      this.sgPhone.setValue(this.storedTrDataObj['sg_phone']);
      this.sgEmail.setValue(this.storedTrDataObj['sg_email']);
      this.brNames.setValue(this.storedTrDataObj['br_names']);
      this.brPhone.setValue(this.storedTrDataObj['br_phone']);
      this.brEmail.setValue(this.storedTrDataObj['br_email']);
    } else {
      this.trItem1.setValue(''); this.trPrice1.setValue('');
      this.trItem2.setValue(''); this.trPrice2.setValue('');
      this.trItem3.setValue(''); this.trPrice3.setValue('');
      this.trDate.setValue(''); this.trLoc.setValue(''); this.trCountry.setValue('');
      this.sgNames.setValue(''); this.sgPhone.setValue(''); this.sgEmail.setValue('');
      this.brNames.setValue(''); this.brPhone.setValue(''); this.brEmail.setValue('');
    }
  }

  hidePriceInput() {
    let trChoice: string = sessionStorage.getItem('dgChoice');
    if (trChoice === 'giveaway') {
      this.priceInput = false;
    } else {
      this.priceInput = true;
    }
  }

  resizeItemInput() {
    let trChoice: string = sessionStorage.getItem('dgChoice');
    if (trChoice === 'giveaway') {
      return '16em';
    } else if (trChoice === 'sale') {
      return '11.5em';
    }
  }

  constructor() {}

  ngOnInit() {
    this.displayTrType();
    this.getStoredTrData();
    this.hidePriceInput();
    this.resizeItemInput();
  }

}