import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  tAmount: number = 1600;
  startPlaces: placesListDesc[] = START;
  endPlaces: placesListDesc[] = END;

  computeFares() {
    let tStart: string = this.startLoc.value;
    let tEnd: string = this.endLoc.value;
    if (tStart === 'douala' && tEnd === 'buea') {
      return 1000;
    } if (tStart === 'douala' && tEnd === 'limbe') {
      return 1200;
    } if (tStart === 'douala' && tEnd === 'muyuka') {
      return 1500;
    } if (tStart === 'douala' && tEnd === 'muyuka') {
      return 1800;
    } else {
      return 0;
    }
  }

  ngOnInit() { }

}
