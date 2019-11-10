import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { START, END } from '../places';
import { from } from 'rxjs';

export interface placesListDesc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-priceguide',
  templateUrl: './priceguide.component.html',
  styleUrls: ['./priceguide.component.css']
})

export class PriceguideComponent implements OnInit {

  constructor() { }

  startLoc = new FormControl(''); 
  endLoc = new FormControl('');
  // tAmount: number;
  startPlaces: placesListDesc[] = START;
  endPlaces: placesListDesc[] = END;

  computeFares() {

    let tStart: string = this.startLoc.value;
    let tEnd: string = this.endLoc.value;

    if (tStart === 'muyuka')
      if(tEnd === 'bamenda') {
        let tPrice: string = '5500 XAF';
        let tDistance: string = '300 KM';
        return [tPrice, tDistance]; }
      if(tEnd === 'buea') {
        let tPrice: string = '500 XAF';
        let tDistance: string = '26.2 KM';
        return [tPrice, tDistance]; } 
      if(tEnd === 'douala') {
        let tPrice: string = '1200 XAF';
        let tDistance: string = '90.1 KM';
        return [tPrice, tDistance]; } 
      if(tEnd === 'kumba') {
        let tPrice: string = '1000 XAF';
        let tDistance: string = '45.5 KM';
        return [tPrice, tDistance]; }
      if(tEnd === 'limbe') {
        let tPrice: string = '800 XAF';
        let tDistance: string = '49 KM';
        return [tPrice, tDistance]; }
      if(tEnd === 'mamfe') {
          let tPrice: string = '3600 XAF';
          let tDistance: string = '198 KM';
          return [tPrice, tDistance];         }  
      if(tEnd === 'tiko') {
        let tPrice: string = '700 XAF';
        let tDistance: string = '36.7 KM';
        return [tPrice, tDistance]; } 
      // else { ['N/A', 'N/A'] }     
    else { 
      return ['N/A', 'N/A']; 
    }
  }

  onChanges(): void {
    this.startLoc.valueChanges.subscribe( 
      () => this.computeFares() );
    this.endLoc.valueChanges.subscribe( 
      () => this.computeFares() );
  }

  ngOnInit() {
    this.onChanges();
  }

}
