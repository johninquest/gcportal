import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { START, END } from '../destinations';

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
  ticketFee = new FormControl(''); ticketOwner = new FormControl('');
  startPlaces: placesListDesc[] = START;
  endPlaces: placesListDesc[] = END;

  printTicket() {
    alert('Under construction ... 👷🏽');
  }

  ngOnInit(): void { }

}
