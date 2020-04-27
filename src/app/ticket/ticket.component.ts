import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PLACES } from '../destinations';

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

  previewTicket() {
    alert('Under construction ... 🚧');
  }

  ngOnInit(): void { }

}
