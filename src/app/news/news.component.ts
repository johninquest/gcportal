import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NewsdataService } from '../services/newsdata.service';
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

  constructor(private nds: NewsdataService) { }

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

  showGoogleNews() {
    let queryTarget: string = 'cameroon';
    let obs = this.nds.getGoogleNews(queryTarget);
    obs.subscribe(
      res => console.log(res), 
      err => console.log(err)
    );
  } 
   
  ngOnInit() {
    this.showNewsData();
    // this.showGoogleNews();
   }

}
