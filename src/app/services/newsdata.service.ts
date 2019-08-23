import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';

@Injectable({ providedIn: 'root' })

export class NewsdataService {

  private baseUrl: string = 'https://gnews.io/api/v3/search?token=1b9fa329965960737566f042fb2d86ac&q=';
  // private baseUrl: string = 'https://newsapi.org/v2/everything?apiKey=bc80aee5a6654843bd745e416bccc24d&sortBy=publishedAt' 
  // Google Custom Search JSON API Key = AIzaSyAbUBuq98veydP52oAe-8LvrKxqTLpNbJ4 
  // Postman: https://www.googleapis.com/customsearch/v1?key=AIzaSyAbUBuq98veydP52oAe-8LvrKxqTLpNbJ4&cx=011742578395077431650:pemrlwdwwbp&q=insurance

  constructor(private http: HttpClient) {}

  getNewsData(qLocation: string): Observable<any> {
    let qLang: string = '&language=en';
    // let qOrder: string = '&sortBy=publishedAt';
    let maxResNumber: string = '&max=30';
    let qDate = moment().subtract(9, 'days').format('YYYY-MM-DD');
    let qDateString = `&mindate=${qDate}`;
    let reqUrl: string = this.baseUrl + qLocation + qLang + maxResNumber + qDateString;
    // console.log(reqUrl)
    return this.http.get(reqUrl);
  }

}

