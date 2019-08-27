import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';

@Injectable({ providedIn: 'root' })

export class NewsdataService {

  // private baseUrl: string = 'https://gnews.io/api/v3/search?token=1b9fa329965960737566f042fb2d86ac&q=';
  private baseUrl: string = 'https://newsapi.org/v2/top-headlines?apiKey=bc80aee5a6654843bd745e416bccc24d&country=gb&sortBy=publishedAt&category=' 
  // Google Custom Search JSON API Key = AIzaSyAbUBuq98veydP52oAe-8LvrKxqTLpNbJ4 
  // private baseUrl: string =  'https://www.googleapis.com/customsearch/v1?key=AIzaSyAbUBuq98veydP52oAe-8LvrKxqTLpNbJ4&cx=011742578395077431650:pemrlwdwwbp';

  constructor(private http: HttpClient) {}

  getNewsData(reqTarget: string): Observable<any> {
    let reqUrl: string = this.baseUrl + reqTarget;
    // console.log(reqUrl)
    return this.http.get(reqUrl);
  }

}

// https://newsapi.org/v2/top-headlines?apiKey=bc80aee5a6654843bd745e416bccc24d&country=de&category=health