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

  computeFare = function() {

    let tStart: string = this.startLoc.value;
    let tEnd: string = this.endLoc.value;

    if(tStart === 'bamenda' && tEnd === 'buea') {
      let tPrice: number = 4500;
      let tDistance: number = 320;
      let tRoad: string = 'BAD';
      return [tPrice, tDistance, tRoad];
    } else { 
      return [0, 0, 'N/A'];
     }
  }

  onChanges(): void {
    this.startLoc.valueChanges.subscribe( 
      () => this.computeFare() );
    this.endLoc.valueChanges.subscribe( 
      () => this.computeFare() );
  }

  ngOnInit() {
    this.onChanges();
  }

}
