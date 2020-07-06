import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  itemForm = new FormGroup({
    itemName: new FormControl('', Validators.required), 
    itemPrice: new FormControl()
  });

  buyerForm = new FormGroup({
    buyerName: new FormControl('', Validators.required),
    buyerPhone: new FormControl(), 
    buyerEmail: new FormControl()
  });

  sellerForm = new FormGroup({
    sellerName: new FormControl('', Validators.required), 
    sellerPhone: new FormControl(), 
    sellerEmail: new FormControl()
  });

  toggleInputBuyer: boolean = false;
  toggleInputSeller: boolean = false;

  ucMessage() {
    alert('Noch eine Baustelle 🚧');
  }

  ngOnInit(): void { }

}
