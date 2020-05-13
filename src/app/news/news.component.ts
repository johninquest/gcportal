import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NewsService } from '../services/news.service';
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

  nTown = new FormControl('', Validators.required);
  nCountry = new FormControl('');
  respData: any; // News response Object
  rssData: any;

  constructor(private nds: NewsService) { }

  showNewsData() { 
    let queryTarget: string = 'cameroon+transport';
    let obs = this.nds.getNewsData(queryTarget);
    obs.subscribe( 
      res => { 
        this.respData = this.handleEmptyResponse(res['articles']);
                },
      err => { 
        this.handleErr(err.status); } 
           );
   }

  handleEmptyResponse(resContent: any) {
     if(Object.keys(resContent).length == 0) {
       return alert('No news was found. Please come back later.');
     }else { return resContent; }
   }

   handleErr(errCode: number) {
    switch(errCode) {
      case 400:
        alert('Bad Request -> Your request is invalid.');
        break;
      case 401:
        alert('Unauthorized -> Your API key is wrong.');
        break; 
      case 429:
        alert('Too Many Requests -> You have reached your daily limit.');
        break;  
      case 500:
        alert('Internal Server Error -> There is a problem with our server. Try again later.');
        break;   
      case 503:
        alert('Service Unavailable -> We are temporarily offline for maintenance. Please try again later.');
        break;  
    } 
   }

   convertDate(respDate: string) {
     if (respDate) {
       // return moment(respDate, 'YYYY-MM-DD HH:mm:ss UTC').format('LLLL');
       return moment.utc(respDate).format('LLLL');
     } else {
       return moment().format('LLLL');
     }
   }

  getGoogleRss() {
    let corsUrl: string = 'https://cors-anywhere.herokuapp.com/';
    let rssUrl: string = 'https://news.google.com/news/rss/headlines/section/geo/cameroon';
    let reqUrl = corsUrl + rssUrl;
    fetch(reqUrl)
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'text/xml'))
      .then(data => { 
        // console.log(data);
        const rss2json = data.querySelectorAll('item');
        // console.log(rssItems);
        this.rssData = rss2json;
      });
  }

  ngOnInit() {
    // this.showNewsData();
    // this.showGoogleNews();
    this.getGoogleRss();
   }

}
