import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WeatherdataService {

  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';
  // api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=kigali
  // weatherdata: Observable<any>

  constructor(private http: HttpClient) { }

  getWeatherData(qTown: string): Observable<any>{
    // const baseUrl: string = 'api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';
    let reqUrl: string = this.baseUrl + qTown;
    return this.http.get(reqUrl);
  }
}
