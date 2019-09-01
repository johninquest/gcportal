import { Component, OnInit } from '@angular/core';

export interface TableDataDesc {
  name: string;
  url: string;
}

const TableData: TableDataDesc[] = [
  {name: 'European Banking Authority (EBA)', url: 'https://eba.europa.eu/consumer-corner'},
  {name: 'European Union Directives', url: 'https://europa.eu/youreurope/citizens/consumers/financial-products-and-services/insurance-products/indexamp_en.htm'},
  {name: 'German Association of the Insured (BdV)', url: 'https://www.bundderversicherten.de/english' },
  {name: 'German Insurance Association (GDV)', url: 'https://www.en.gdv.de/en'}
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
