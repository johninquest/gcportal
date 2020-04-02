import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DbService {

  constructor(private http: HttpClient) { }

  private dbUrl: string = 'http://localhost:3000/';
  // private dbUrl: string = 'https://mandiguide2020.appspot.com/';

  postRequest(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  getRequest(dbEndpoint: string): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.get(dbUrl);
  }
}
