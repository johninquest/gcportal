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

  // private baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';
  constructor(private wds: WeatherdataService) { }

  showWeatherData() { 
    // let reqUrl: string = this.baseUrl + this.wTown.value; 
    let obs = this.wds.getWeatherData(this.wTown.value, this.wCountry.value);
    obs.subscribe( res => { 
      this.resData = res; 
    });
  }

  ngOnInit() { }

}
