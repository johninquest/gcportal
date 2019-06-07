import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COUNTRYCODES } from '../countrycodes';
import * as moment from 'moment';
moment.locale('de');

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

  nTitle: string = 'nachrichten';

  nTown = new FormControl('', Validators.required);
  nCountry = new FormControl('');
  cCodes: cCodeDesc[] = COUNTRYCODES;
  respData: any; // News response Object

  constructor() { }

  ngOnInit() { }

}
