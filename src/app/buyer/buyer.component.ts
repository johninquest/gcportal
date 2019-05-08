import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  b_firstName: string;
  b_lastName: string;
  b_phoneNumber: string;
  b_eMail: string;

  saveBuyerDataToSS() {
    sessionStorage.setItem('buyer_fname', this.b_firstName);
    sessionStorage.setItem('buyer_lname', this.b_lastName);
    sessionStorage.setItem('buyer_pnumber', this.b_phoneNumber);
    sessionStorage.setItem('buyer_email', this.b_eMail);
  }

  getBuyerDataFromSS() {
    if (sessionStorage.getItem('buyer_fname' || 'buyer_lname' || 'buyer_pnumber' || 'buyer_email') === null) {
      return (
        this.b_firstName = '',
        this.b_lastName = '',
        this.b_phoneNumber = '',
        this.b_eMail = ''
        );
    } else {
      return (
        this.b_firstName = sessionStorage.getItem('buyer_fname'),
        this.b_lastName = sessionStorage.getItem('buyer_lname'),
        this.b_phoneNumber = sessionStorage.getItem('buyer_pnumber'),
        this.b_eMail = sessionStorage.getItem('buyer_email')
      );
    }
  }

  constructor() { }

  ngOnInit() {
    this.getBuyerDataFromSS();
  }

}
