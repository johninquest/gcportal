import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WeatherdataService {

  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';

  constructor(private http: HttpClient) { }

  getWeatherData(qTown: string, qCountry: string): Observable<any>{
    let reqUrl: string = this.baseUrl + qTown + qCountry;
    return this.http.get(reqUrl);
  }
}
