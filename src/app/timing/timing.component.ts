import { Component, OnInit } from '@angular/core';
import moment from 'moment';
moment.locale('de');

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent implements OnInit {

  constructor() { }

  autoKommen() {
    let dtstamp: string = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(dtstamp);
  }

  autoGehen() {
    let dtstamp: string = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(dtstamp);
  }

  ngOnInit(): void { }

}
