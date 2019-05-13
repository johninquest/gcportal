import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import { Data } from './contact/contact.component';

@Injectable({ providedIn: 'root' })

export class SlackService {

  // private url: string = 'https://hooks.slack.com/services/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';
  private url: string = 'hkjhgkjhgkj';

  constructor(private http: HttpClient) { }

  sendData(body: Object): Observable<Object> {
    return this.http.post<Object>(this.url, body)
    .pipe(
      retry(0),
      catchError(this.customErrorHandle)
    ); 
  }

  customErrorHandle(err: HttpErrorResponse) {
    let errMessage: string;
    let errCode = err.status; 
    if (errCode === 200) {
      errMessage = 'Ihre Nachricht wurde erfolgreich gesendet 😊.';
    } else {
      errMessage = 'Ihre Nachricht konnte nicht gesendet werden ☹️! \nBitte versuchen Sie es nochmal später.';
    }
    alert(errMessage);
    return throwError(errCode);
  }
}