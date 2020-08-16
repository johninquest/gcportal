import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import { from } from "rxjs";

export interface Vatdesc {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"],
})
export class InvoiceComponent implements OnInit {
  constructor(private cs: CalculatorService) {}

  itemForm = new FormGroup({
    itemName: new FormControl("", Validators.required),
    itemPrice: new FormControl(),
    itemTax: new FormControl(),
  });

  buyerForm = new FormGroup({
    buyerName: new FormControl("", Validators.required),
    buyerPhone: new FormControl(),
    buyerEmail: new FormControl(),
  });

  sellerForm = new FormGroup({
    sellerName: new FormControl("", Validators.required),
    sellerPhone: new FormControl(),
    sellerEmail: new FormControl(),
  });

  toggleInputBuyer: boolean = false;
  toggleInputSeller: boolean = false;

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  ucMessage() {
    alert("Noch eine Baustelle 🚧");
  }

  ngOnInit(): void {}
}
