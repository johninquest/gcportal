import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PLACES } from '../destinations';
import moment from 'moment';
moment.locale('de');

export interface placesListDesc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {

  constructor() { }

  startLocation = new FormControl(''); endLocation = new FormControl('');
  ticketFee = new FormControl(''); ticketOwnerName = new FormControl(''); 
  ticketOwnerId = new FormControl(''); ticketNumber = new FormControl('');
  startPlaces: placesListDesc[] = PLACES;
  endPlaces: placesListDesc[] = PLACES;
  toggleInput: boolean = true; togglePreview: boolean = false; toggleButtons: boolean = false;
  tDate = moment().format('LLL');

  previewTicket() {
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
    // alert('Under construction ... 🚧');
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  calculateTaxTotal(feeBeforeTax: number) {
    let taxRate: number = 19.25;
    let taxTotal: number = (taxRate / 100) * feeBeforeTax;
    let feeAfterTax: number = taxTotal + feeBeforeTax;
    if(feeBeforeTax) {
      return [Math.round(taxTotal), Math.round(feeAfterTax)]; 
    }else {
      return ['', ''];
    }  
  }

  saveAsImage() {
    alert('Under construction 🚧');
  }

  saveAsPdf() {
    alert('Under construction 🚧');
  }

  ngOnInit(): void { }

}
