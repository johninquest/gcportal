import { Component, OnInit } from '@angular/core';
import moment from 'moment';
moment.locale('en-gb');
import { from } from 'rxjs';

export interface cCodeDesc { 
  value: string;
  viewValue: string;
  viewName: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  respData: any; // News response Object
  googleNewsData: any;

  constructor() { }

  convertDate(respDate: string) {
     if (respDate) {
       // return moment(respDate, 'YYYY-MM-DD HH:mm:ss UTC').format('LLLL');
       return moment.utc(respDate).format('LLLL');
     } else {
       return moment().format('LLLL');
     }
   }

  getGoogleNews() {
    let corsUrl: string = 'https://cors-anywhere.herokuapp.com/';
    let rssUrl: string = 'https://news.google.com/news/rss/headlines/section/geo/cameroon';
    let reqUrl = corsUrl + rssUrl;
    fetch(reqUrl)
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'text/xml'))
      .then(data => { 
        let data2json = data.querySelectorAll('item');
        this.googleNewsData = data2json;
      });
  }

  ngOnInit() {
    this.getGoogleNews();
   }

}
