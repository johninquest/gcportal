import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { START, END, DETAILS } from '../places';
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
  startPlaces: placesListDesc[] = START;
  endPlaces: placesListDesc[] = END;
  // detailsList: tripDetailsListDesc[] = DETAILS; 

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

  testList = function() {
    let input1 = this.startLoc.value;
    let input2 = this.endLoc.value;
    console.log(input1, input2);
    const d = DETAILS; 
    for (let i = 0; i < d.length; i++) {
      // console.log(d[i]);
      if (d[i].includes(input1) && d[i].includes(input2)) {
        return console.log(d[i]);
        // break;
      }
      // return console.log(d[i]);
    }

  }

  onChanges(): void {
    this.startLoc.valueChanges.subscribe( 
      () => { this.computeFare(); this.testList(); } );
    this.endLoc.valueChanges.subscribe( 
      () => { this.computeFare(); this.testList(); } );
  }

  ngOnInit() {
    this.onChanges();
    this.testList();
  }

}
