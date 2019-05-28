import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import { WeatherdataService } from '../services/weatherdata.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  wTitle = 'wetter info'
  wTown = new FormControl('', Validators.required);
  wCountry = new FormControl('', Validators.required);
  wTemp: any; 

  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';

  constructor(private http: HttpClient) { }

  showWeatherData() {
    /* let tempNow: number = 25;
    let tempUnit: string = '℃';
    return this.wTemp = tempNow + ' ' + tempUnit; */ 
    let reqUrl: string = this.baseUrl + this.wTown.value; 
    this.http.get(reqUrl)
    .subscribe(res => { this.wTemp = res['main']['temp'] }
    );
  }

  ngOnInit() { }

}
