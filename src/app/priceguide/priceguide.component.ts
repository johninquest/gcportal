import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { START, END, DETAILS } from '../destinations';
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

  startLocation = new FormControl(''); 
  endLocation = new FormControl('');
  startPlaces: placesListDesc[] = START;
  endPlaces: placesListDesc[] = END;

  tripDetails() {
    let tStart: string = this.startLocation.value;
    let tEnd: string = this.endLocation.value;
    
    const getDetail: object = DETAILS.find(
      function(d) {
        if ((d.from === tStart && d.to === tEnd) || (d.from === tEnd && d.to === tStart)) 
        { return d; } });
    if (getDetail) {
      let tPrice: number = getDetail['price'];
      let tDistance: number = getDetail['distance'];
      let tRoad: string = getDetail['roadstate'];
      return [tPrice, tDistance, tRoad];
    } else {
      return ['', '', ''];
    }
  }

  computeFare(priceValue: any, distanceValue: any) {
    if(priceValue) {
      // returns price if a fixed has been entered for that route
      return priceValue;
    }else {
      // define formula for calculating and returning price based on distance
      let calcPrice: any = (28 * distanceValue).toFixed(2);
      return calcPrice;
    }
  }

  showUnit() {
    let returnValue = this.tripDetails();
    if (returnValue.includes('')) {
      return ['', ''];
      // return ['XAF', 'KM'];
    } else { 
      return ['XAF', 'KM'];
     }
  }

  onChanges(): void {
    this.startLocation.valueChanges.subscribe( 
      () => { 
        this.tripDetails(); 
        this.showUnit(); 
      });
    this.endLocation.valueChanges.subscribe( 
      () => { 
        this.tripDetails(); 
        this.showUnit();
      });
  }

  ngOnInit() {
    this.onChanges();
  }
}
