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
    paidBy: new FormControl(""),
    paidFor: new FormControl(""),
    transactionLocation: new FormControl(""),
    transactionDate: new FormControl(""),
    furtherInfos: new FormControl(""),
  });

  afterTaxValue: string = "";

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  showAfterTaxTotal() {
    let _amount: number = this.invoiceForm.get("amountBeforeTax").value;
    let _tax: number = this.invoiceForm.get("taxValue").value;
    if (_amount && _tax) {
      return (this.afterTaxValue = this.cs.calculateVAT(_amount, _tax));
    } else {
      return "";
    }
    /*  console.log(this.cs.calculateVAT(_amount, _tax));
    returnthis.afterTaxValue = this.cs.calculateVAT(_amount, _tax);
    //return (this.afterTaxValue = this.cs.calculateVAT(_amount, _tax)); */
  }

  onChanges(): void {
    this.invoiceForm.controls["amountBeforeTax"].valueChanges.subscribe(() => {
      this.showAfterTaxTotal();
    });
    this.invoiceForm.controls["taxValue"].valueChanges.subscribe(() => {
      this.showAfterTaxTotal();
    });
  }

  ucMessage() {
    // alert("Noch eine Baustelle 🚧");
    this.showAfterTaxTotal();
  }
  ngOnInit(): void {}
}
