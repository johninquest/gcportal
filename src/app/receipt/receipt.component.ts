import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor() {}

  toggleInput = true;

  addItem() {
    alert('Under construction 🚧');
  }

  receiptPreview() {
    alert('Under construction 🚧');
  }

  ngOnInit(): void {}
}
