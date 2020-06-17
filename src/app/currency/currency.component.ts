import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CURRENCIES } from '../destinations';

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
      return _amount * 159;
    }if(_currency === 'cad') {
      return _amount * 431;
    }if(_currency === 'cny') {
      return _amount * 82.5;
    }if(_currency === 'gbp') {
      return _amount * 733;
    }if(_currency === 'ghs') {
      return _amount * 101;
    }if(_currency === 'eur') {
      return _amount * 655;
    }if(_currency === 'kes') {
      return _amount * 5.5;
    }if(_currency === 'ngn') {
      return _amount * 1.5;
    }if(_currency === 'usd') {
      return _amount * 584;
    }if(_currency === 'xof') {
      return _amount * 1;
    }if(_currency === 'zar') {
      return _amount * 34;
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
