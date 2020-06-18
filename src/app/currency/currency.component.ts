import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CURRENCIES } from '../lists/business';

export interface currencyListDesc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  constructor() { }

  amount = new FormControl('');
  currency = new FormControl('');
  currencyList: currencyListDesc[] = CURRENCIES;

  xafValue(_amount: number, _currency: string ) {
    if(_currency === 'aed') {
      let convertedValue: string = (_amount * 159.25).toFixed(1);
      return convertedValue;
    }if(_currency === 'cad') {
      let convertedValue: string = (_amount * 430.21).toFixed(1);
      return convertedValue;
    }if(_currency === 'cny') {
      let convertedValue: string = (_amount * 82.5).toFixed(1);
      return convertedValue;
    }if(_currency === 'eur') {
      let convertedValue: string = (_amount * 655.95).toFixed(1);
      return convertedValue;
    }if(_currency === 'gbp') {
      let convertedValue: string = (_amount * 730).toFixed(1);
      return convertedValue;
    }if(_currency === 'ghs') {
      let convertedValue: string = (_amount * 101).toFixed(1);
      return convertedValue;
    }if(_currency === 'inr') {
      let convertedValue: string = (_amount * 7.66).toFixed(1);
      return convertedValue;
    }if(_currency === 'kes') {
      let convertedValue: string = (_amount * 5.50).toFixed(1);
      return convertedValue;
    }if(_currency === 'ngn') {
      let convertedValue: string = (_amount * 1.50).toFixed(1);
      return convertedValue;
    }if(_currency === 'usd') {
      let convertedValue: string = (_amount * 584).toFixed(1);
      return convertedValue;
    }if(_currency === 'xof') {
      let convertedValue: string = (_amount * 1).toFixed(1);
      return convertedValue;
    }if(_currency === 'zar') {
      let convertedValue: string = (_amount * 33.45).toFixed(1);
      return convertedValue;
    }   
  }

  showResultCurrency() {
    if(this.amount.value && this.currency.value) {
      return 'XAF';
    }else {
      return '';
    }
  }

  onChanges(): void {
    this.amount.valueChanges.subscribe( 
      () => this.xafValue(this.amount.value, this.currency.value) );
  }

  ngOnInit(): void { }

}
