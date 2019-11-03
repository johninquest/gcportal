import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent implements OnInit {

  panelOpenState = false;

  msg() {
    alert('coming soon ... ');
  }

  constructor() { }

  ngOnInit() { }

}
