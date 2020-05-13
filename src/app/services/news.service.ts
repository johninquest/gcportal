import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class NewsService {

  private baseUrl: string = 'https://newsapi.org/v2/everything?apiKey=bc80aee5a6654843bd745e416bccc24d&sortBy=publishedAt&q=';
  private googleNewsBaseUrl: string = 'https://news.google.com/news/rss/headlines/section/geo/'; 
  private corsUrl: string = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getNewsData(reqTarget: string): Observable<any> {
    let reqUrl: string = this.baseUrl + reqTarget;
    return this.http.get(reqUrl);
  }

  getGoogleNews(reqTarget: string): Observable<any> {
    let reqUrl: string = this.corsUrl + this.googleNewsBaseUrl + reqTarget;
    return this.http.get(reqUrl);
  }

}