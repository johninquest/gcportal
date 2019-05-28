import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherdataService } from '../services/weatherdata.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  wTitle = 'wetter info'
  wTown = new FormControl('', Validators.required);
  wCountry = new FormControl('', Validators.required);
  wTemp: string; 

  constructor(private wdservice: WeatherdataService) { }

  getWeather() {
    let tempNow: number = 25;
    let tempUnit: string = '℃';
    return this.wTemp = tempNow + ' ' + tempUnit; 
    // this.wdservice.getWeatherData(this.wTown);
  }

  ngOnInit() { }

}
