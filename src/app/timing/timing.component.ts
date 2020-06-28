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
    let msg = confirm('Stempelzeit \n' + dtstamp);
    if(msg) {
      alert('Die Zeit wurde erfolgreich gespeichert');
    }else {
      alert('Die Zeiten wurde nicht gespeichert');
    }
    console.log(dtstamp);
  }

  autoGehen() {
    let dtstamp: string = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(dtstamp);
  }

  ngOnInit(): void { }

}
