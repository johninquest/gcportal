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

    if (tStart === 'buea' && tEnd === 'douala') {
      let tPrice: number = 1000;
      let tDistance: number = 71.2;
      return [tPrice, tDistance];
    } else { 
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
