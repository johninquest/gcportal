import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsdataService {

  private baseUrl: string = 'https://gnews.io/api/v2/?token=1b9fa329965960737566f042fb2d86ac&q=';
  /* https://gnews.io/api/v2/?token=1b9fa329965960737566f042fb2d86ac&q=muyuka&country=cm&lang=en&max=5&mindate=2019-05-01 */

  constructor(private http: HttpClient) { }

  getNewsData(qTown: string, qCountry: string): Observable<any> {
    let qLang: string = '&lang=de';
    let maxRespNumber: string = '&max=5';
    let reqUrl: string = this.baseUrl + qTown + qCountry + qLang + maxRespNumber;
    console.log(reqUrl)
    return this.http.get(reqUrl);
  }

}
