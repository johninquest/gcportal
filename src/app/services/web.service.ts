import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class WebService {
  constructor(private http: HttpClient) {}

  postRequest(reqUrl: string, reqPayload: object): Observable<object> {
    let reqPost = this.http.post(reqUrl, reqPayload);
    return reqPost;
  }

  getRequest(reqUrl: string): Observable<object> {
    let reqGet = this.http.get(reqUrl);
    return reqGet;
  }
}
