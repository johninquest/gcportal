import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor() { }

  toggleInput: boolean = true;
  togglePreview: boolean = false;

  guestInfoForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    arrivedAt: new FormControl(''),
    departedAt: new FormControl(''),
    tableNumber: new FormControl(''),
    phoneNumber: new FormControl(''),
    eMail: new FormControl('')  
  });

  preview() {
    // this.toggleInput = false;
    alert('Ist noch eine Baustelle');
  }

  msg() {
    alert('Ist noch eine Baustelle');
  }

  ngOnInit(): void { }

}
