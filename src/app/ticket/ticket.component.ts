import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PLACES } from '../destinations';
import { PrintService } from '../services/print.service';
import moment from 'moment';
moment.locale('en-gb');

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

  constructor(private ps: PrintService) { }

  startLocation = new FormControl(''); endLocation = new FormControl('');
  ticketFee = new FormControl(''); ticketOwnerName = new FormControl(''); 
  ticketOwnerId = new FormControl(''); ticketNumber = new FormControl('');
  startPlaces: placesListDesc[] = PLACES;
  endPlaces: placesListDesc[] = PLACES;
  toggleInput: boolean = true; 
  togglePreview: boolean = false; 
  toggleButtons: boolean = false; 
  toggleCanvas: boolean = false;
  tDate: string;

  previewTicket() {
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
    this.tDate = moment().format('LLL');
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  saveAsImage() {
    let targetElement = document.getElementById('ticketElement');
    this.ps.ticketToImage(targetElement);
   }

  saveAsPdf() {
    // alert('Coming soon 🚧');
    let ticketData: object = {
      sLocation: this.startLocation.value,
      eLocation: this.endLocation.value,
      tFee: this.ticketFee.value,
      tOwnerName: this.ticketOwnerName.value,
      tOwnerId: this.ticketOwnerId.value,
      tNumber: this.ticketNumber.value
    };
    this.ps.ticketToPDF(ticketData);
  }

  ngOnInit(): void {}

}

  /*
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
 */