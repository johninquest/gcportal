import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutTitle: string = 'Über stuuur';
  aboutInfo: string;

  constructor() { }

  ngOnInit() {
  }

}
