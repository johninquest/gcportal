import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WebService {

  constructor(private http: HttpClient) { }

  // private dbUrl: string = 'https://mandiguide2020.appspot.com/';
  // private ipUrl: string = 'https://api.ipify.org?format=';
  // private slackHookUrl: string = 'https://hooks.slack.com/services/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';

  postRequest(reqUrl: string, reqPayload: object): Observable<object> {
    let reqPost = this.http.post(reqUrl, reqPayload);
    return reqPost;
  }

  getRequest(reqUrl: string): Observable<object> {
    let reqGet = this.http.get(reqUrl);
    return reqGet;
  }

}
