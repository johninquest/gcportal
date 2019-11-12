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

  testNew = function() {
    let input1: string = this.startLoc.value;
    let input2: string = this.endLoc.value;
    // console.log(input1, input2);
    const d = DETAILS; 
    // console.log(d);
    for (let item of d) {
      if (item.includes(input1) && item.includes(input2)) {
        console.log(item);
        break;
      }
      // console.log(item);
    }

   /* for (let i = 0; i < d.length; i++) {
      if (d[i].includes(input1) && d[i].includes(input2)) {
        let tPrice = d[i][2];
        let tDistance = d[i][3];
        let tRoad = d[i][4];
        console.log(tPrice, tDistance, tRoad);
      }
      // return console.log(d[i]);
    } */
  }

  onChanges(): void {
    this.startLoc.valueChanges.subscribe( 
      () => { this.computeFare();
              this.testNew(); } );
    this.endLoc.valueChanges.subscribe( 
      () => { this.computeFare();
              this.testNew(); } );
  }

  ngOnInit() {
    this.onChanges();
    this.testNew();
  }

}
