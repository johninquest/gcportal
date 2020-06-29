import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { from } from 'rxjs';

@Component({
  selector: 'app-gastanmeldung',
  templateUrl: './gastanmeldung.component.html',
  styleUrls: ['./gastanmeldung.component.css']
})
export class GastanmeldungComponent implements OnInit {

  constructor() { }

  guestInfoForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    arrivedAt: new FormControl(''),
    departedAt: new FormControl(''),
    phoneNumber: new FormControl(''),
    eMail: new FormControl(''),  
  });

  preview() {
    alert('Ist noch eine Baustelle');
  }

  msg() {
    alert('Ist noch eine Baustelle');
  }

  ngOnInit(): void { }

}
