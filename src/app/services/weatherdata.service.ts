import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class WeatherdataService {

  private baseUrl: string = 'api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=';
  // api.openweathermap.org/data/2.5/weather?appid=5fcc3c4a71b04e0848c1b8c80a738ce3&units=metric&q=kigali

  constructor(private http: HttpClient) { }

  getWeatherData(qTown: string) {
    let reqUrl: string = this.baseUrl + qTown;
    return this.http.get(reqUrl)
    .pipe(
      retry(0),
      catchError(this.customErrorHandle)
    ); 
  }

  customErrorHandle(err: HttpErrorResponse) {
    // let errMessage: string;
    let errCode = err.status; 
    console.log(errCode)
    /* if (errCode === 200) {
      errMessage = 'Ihre Nachricht wurde erfolgreich gesendet 😊.';
    } else {
      errMessage = 'Ihre Nachricht konnte nicht gesendet werden ☹️! \nBitte versuchen Sie es nochmal später.';
    }
    alert(errMessage); */
    return throwError(errCode);
  }
}
