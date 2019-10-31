import { Component, OnInit } from '@angular/core';

export interface TableDataDesc {
  name: string;
  url: string;
}

const TableData: TableDataDesc[] = [
  {name: 'Ministry of Transport (Cameroon)', url: 'https://mintransports.net/fr/'},
  {name: 'A', url: 'coming soon'},
  {name: 'B', url: 'coming soon' },
  {name: 'C', url: 'coming soon'}
];

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = TableData;

  openExtUrl(targetUrl: string) {
    window.open(targetUrl, '_blank');
    window.focus();
  }

  constructor() { }

  ngOnInit() { }

}
