import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() {}

  ticketToPDF(ticketData: object) {
    console.log(ticketData);
  }
  
}
