import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NewsdataService {

  private baseUrl: string = 'https://gnews.io/api/v2/?token=1b9fa329965960737566f042fb2d86ac&q=';

  constructor(private http: HttpClient) { }

  getNewsData(qTown: string, qCountry: string): Observable<any> {
    let qLang: string = '&lang=de';
    let maxRespNumber: string = '&max=5';
    let qDate: string = moment().format('YYYY-MM-DD');
    let qDateString = `&mindate=${qDate}`;
    let reqUrl: string = this.baseUrl + qTown + qCountry + qLang + maxRespNumber + qDateString;
    console.log(reqUrl)
    return this.http.get(reqUrl);
  }

}
