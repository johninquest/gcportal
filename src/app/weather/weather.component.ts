import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherdataService } from '../services/weatherdata.service';
import { COUNTRYCODES } from '../countrycodes';
import * as moment from 'moment';
moment.locale('de');

export interface cCodeDesc { 
  value: string;
  viewValue: string;
  viewName: string;
}


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  wTitle = 'wetter info'
  cCodes: cCodeDesc[] = COUNTRYCODES;
  wTown = new FormControl('', Validators.required);
  wCountry = new FormControl('', Validators.required);
  resData: any;
  wTime = moment().format('dddd') + ', ' + moment().format('HH:mm');
  // wSunrise = moment.utc(this.resData.sys.sunrise, 'X').local();

    constructor(private wds: WeatherdataService) { }

  reqCountry() {
    if(this.wCountry.value) {
      let qString: string = ',' +  this.wCountry.value;
      return qString;
    } else { return ''; }
  }

  showWeatherData() { 
    // let reqUrl: string = this.baseUrl + this.wTown.value; 
    let obs = this.wds.getWeatherData(this.wTown.value, this.reqCountry());
    obs.subscribe( res => { this.resData = res; },
                   err => { this.errMessage(err.status); } 
                   );
   }

  errMessage(errcode: number) {
    switch(errcode) { 
      case 400:
      case 404:
      alert('Es wurde für "' + this.wTown.value.toUpperCase() + this.reqCountry().toUpperCase() + '" keine Wetterinfos gefunden.\nBitte überprüfen Sie Ihre Eingabe!') }
  }

  windMs2Kmh(speed: number) {
    return (speed * 3.6).toFixed(2);
  }

  cUnixDate(udate: number) {
    return moment.utc(udate, 'X').local().format('HH:mm');
  }

  ngOnInit() { }

}
