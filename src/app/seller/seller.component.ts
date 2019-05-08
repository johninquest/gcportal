import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  s_firstName: string;
  s_lastName: string;
  s_phoneNumber: string;
  s_eMail: string;

  saveSellerDataToSS() {
    sessionStorage.setItem('seller_fname', this.s_firstName);
    sessionStorage.setItem('seller_lname', this.s_lastName);
    sessionStorage.setItem('seller_pnumber', this.s_phoneNumber);
    sessionStorage.setItem('seller_email', this.s_eMail);
  }

  getSellerDataFromSS() {
    if (sessionStorage.getItem('seller_fname' || 'seller_lname' || 'seller_pnumber' || 'seller_email') === null) {
      return (
        this.s_firstName = '',
        this.s_lastName = '',
        this.s_phoneNumber = '',
        this.s_eMail = ''
        );
    } else {
      return (
        this.s_firstName = sessionStorage.getItem('seller_fname'),
        this.s_lastName = sessionStorage.getItem('seller_lname'),
        this.s_phoneNumber = sessionStorage.getItem('seller_pnumber'),
        this.s_eMail = sessionStorage.getItem('seller_email')
      );
    }
  }

  constructor() { }

  ngOnInit() {
    this.getSellerDataFromSS();
  }

}
