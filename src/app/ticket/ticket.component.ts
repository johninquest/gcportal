import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { PLACES } from '../destinations';
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

  constructor() { }

  startLocation = new FormControl(''); endLocation = new FormControl('');
  ticketFee = new FormControl(''); ticketOwnerName = new FormControl(''); 
  ticketOwnerId = new FormControl(''); ticketNumber = new FormControl('');
  startPlaces: placesListDesc[] = PLACES;
  endPlaces: placesListDesc[] = PLACES;
  toggleInput: boolean = true; 
  togglePreview: boolean = false; 
  toggleButtons: boolean = false; 
  toggleCanvas: boolean = false;
  tDate = moment().format('LLL');

  previewTicket() {
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  saveAsImage() {
    let targetElement = document.getElementById('ticketElement');
    html2canvas(targetElement)
    .then((canvas: any) => {      
      let ctx = canvas.getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas.toDataURL('image/jpeg', 1.0).replace('image/png', 'image/octet-stream');
      let timeNow: string = moment().format('YYYYMMDDTHHmmss');
      return saveAs(imageGened, `TN-${timeNow}.JPEG`); 
    });
   }

  saveAsPdf() {
    alert('Coming soon 🚧');
  }

  ngOnInit(): void { }

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