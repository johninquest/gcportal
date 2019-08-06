import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COUNTRYCODES } from '../countrycodes';
import { NewsdataService } from '../services/newsdata.service';
import moment from 'moment';
moment.locale('en');
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

  nTitle: string = 'local news';

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
    let qData: string = this.nTown.value + ',' + this.reqCountry(); 
    let obs = this.nds.getNewsData(qData);
    obs.subscribe( res => { this.respData = res; },
                   err => { console.log(err); } 
                   );
   }

   handleErr(errCode: number) {
     errCode;
   }

   cDate(respDate: string) {
     return moment.utc(respDate).format('LLLL');
   }
   
  ngOnInit() { }

}
