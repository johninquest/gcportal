import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  // position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'European Banking Authority (EBA)'},
  {name: 'European Union Directives'},
  {name: 'German Association of the Insured (BdV)'},
  {name: 'German Insurance Association (GDV)'}
];

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() { }

}
