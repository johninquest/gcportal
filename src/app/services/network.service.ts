import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({  providedIn: 'root' })

export class NetworkService {

  constructor(private http: HttpClient) { }

  private ipUrl: string = 'https://api.ipify.org?format=';

  getRequest(rFormat: string): Observable<object> {
    let reqUrl = this.ipUrl + rFormat;
    return this.http.get(reqUrl);
  }

}
