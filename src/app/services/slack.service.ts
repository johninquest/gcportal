import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class SlackService {

  private url: string = 'https://hooks.slack.com/services/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';

  constructor(private http: HttpClient) { }

  sendData(body: Object): Observable<any> {
    return this.http.post<any>(this.url, body)
    .pipe(
      retry(0),
      catchError(this.customErrorHandle)
    ); 
  }

  customErrorHandle(err: HttpErrorResponse) {
    let errMessage: string;
    let errCode = err.status; 
    if (errCode === 200) {
      errMessage = 'Your message was sent successfully 😊.';
    } else {
      errMessage = 'Your message could not be sent ☹️! \nPlease try again later.';
    }
    alert(errMessage);
    return throwError(errCode);
  }
}