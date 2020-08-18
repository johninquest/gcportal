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

  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl(""),
    amountBeforeTax: new FormControl(""),
    taxValue: new FormControl(""),
    amountAfterTax: new FormControl({ value: "", disabled: true }),
    paidBy: new FormControl(""),
    paidFor: new FormControl(""),
    transactionLocation: new FormControl(""),
    transactionDate: new FormControl(""),
    furtherInfos: new FormControl(""),
  });

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  logInputs() {
    console.log(this.invoiceForm.value);
  }

  ucMessage() {
    alert("Noch eine Baustelle 🚧");
    this.logInputs();
  }

  ngOnInit(): void {}
}
