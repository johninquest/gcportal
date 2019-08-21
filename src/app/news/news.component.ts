import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COUNTRYCODES } from '../countrycodes';
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
  cCodes: cCodeDesc[] = COUNTRYCODES;
  respData: any; // News response Object

  constructor(private nds: NewsdataService) { }

  reqCountry() {
    if(this.nCountry.value) {
      let qString: string = this.nCountry.value;
      return qString;
    } else { return ''; }
  }

  showNewsData() { 
    // let reqUrl: string = this.baseUrl + this.wTown.value;
    //let qData: string = this.nTown.value + ',' + this.reqCountry(); 
    let qData: string = 'insurance';
    let obs = this.nds.getNewsData(qData);
    obs.subscribe( res => { 
                            // this.respData = res['articles']; 
                            this.respData = this.handleEmptyResponse(res['articles']);
                          },
                   err => { this.handleErr(err.status); } 
                   );
   }

   handleEmptyResponse(resContent: any) {
     // let cLength = Object.keys(myObject).length == 0
     if(Object.keys(resContent).length == 0) {
       return alert('No news was found for this location. Please, try another location.');
     } else {
      return resContent;
     }
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
    return moment(respDate, 'YYYY-MM-DD HH:mm:ss UTC').format('LLLL'); 
    //return moment.utc(respDate).format('LLLL');
   }
   
  ngOnInit() {
    this.showNewsData();
   }

}
