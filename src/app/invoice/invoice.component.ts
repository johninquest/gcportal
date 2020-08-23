import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import moment from "moment";
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

  // afterTaxValue: string = "0";

  invoiceNumber = new FormControl("");
  amountBeforeTax = new FormControl("0.00");
  taxPercentage = new FormControl("");
  /*   amountAfterTax = new FormControl({
    value: "",
    disabled: true,
  }); */
  paidBy = new FormControl("");
  paidFor = new FormControl("");
  transactionLocation = new FormControl("");
  transactionDate = new FormControl({
    value: moment().locale("de").format("L"),
    disabled: true,
  });
  furtherDetails = new FormControl("");

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  showAfterTaxTotal(_amount: number, _tax: number) {
    // _amount = this.amountBeforeTax.value;
    // _tax = this.taxPercentage.value;
    if (_amount && _tax) {
      let calculatedTotalPlusTax = this.cs.calculateVAT(_amount, _tax);
      return calculatedTotalPlusTax;
    }
    if (_amount && !_tax) {
      return this.amountBeforeTax.value;
    }
    if (!_amount && _tax) {
      return 0;
    } else {
      return "";
    }
  }

  onChanges(): void {
    this.amountBeforeTax.valueChanges.subscribe(() => {
      this.showAfterTaxTotal(
        this.amountBeforeTax.value,
        this.taxPercentage.value
      );
    });
    this.taxPercentage.valueChanges.subscribe(() => {
      this.showAfterTaxTotal(
        this.amountBeforeTax.value,
        this.taxPercentage.value
      );
    });
  }

  amountAfterTax = new FormControl({
    value: this.showAfterTaxTotal(
      this.amountBeforeTax.value,
      this.taxPercentage.value
    ),
    disabled: true,
  });

  ucMessage() {
    // alert("Noch eine Baustelle 🚧");
    this.showAfterTaxTotal(
      this.amountBeforeTax.value,
      this.taxPercentage.value
    );
  }
  ngOnInit(): void {}
}
