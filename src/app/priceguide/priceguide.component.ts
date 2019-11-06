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

    if (tStart === 'douala' && tEnd === 'buea') {
      return 1000;
    } if (tStart === 'douala' && tEnd === 'limbe') {
      return 1200;
    } if (tStart === 'douala' && tEnd === 'mamfe') {
        return 6500;
    } if (tStart === 'douala' && tEnd === 'muyuka') {
      return 1500;
    } if (tStart === 'douala' && tEnd === 'kumba') {
      return 2500;
    } if (tStart === 'douala' && tEnd === 'tiko') {
      return 600;
    } 
    else { return 0; }
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
