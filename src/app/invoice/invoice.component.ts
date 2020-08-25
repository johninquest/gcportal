import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import { PrintService } from "../services/print.service";
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
  constructor(private cs: CalculatorService, private ps: PrintService) {}

  afterTaxTotal: string = "";

  invoiceNumber = new FormControl("");
  amountBeforeTax = new FormControl("0", Validators.required);
  taxPercentage = new FormControl("");
  paidBy = new FormControl("");
  paidFor = new FormControl("");
  transactionLocation = new FormControl("");
  transactionDate = new FormControl({
    value: moment().locale("de").format("L"),
    disabled: true,
  });
  furtherDetails = new FormControl("");

  toggleInput: boolean = true;
  togglePreview: boolean = false;
  togglePreviewButtons: boolean = false;

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  showAfterTaxTotal() {
    let _amount: number = this.amountBeforeTax.value;
    let _tax: number = this.taxPercentage.value;
    if (_amount && _tax) {
      let calculatedTotalPlusTax = this.cs.calculateVAT(_amount, _tax);
      return (this.afterTaxTotal = calculatedTotalPlusTax);
    }
    if (_amount && !_tax) {
      return (this.afterTaxTotal = this.amountBeforeTax.value);
    }
    if (!_amount && _tax) {
      return (this.afterTaxTotal = "0");
    } else {
      return "";
    }
  }

  previewInvoice() {
    let currentDateTime: string = moment().locale("de").format("LLL");
    this.transactionDate.setValue(currentDateTime);
    this.toggleInput = false;
    this.togglePreview = true;
    this.togglePreviewButtons = true;
  }

  backToInput() {
    let currentDate: string = moment().locale("de").format("L");
    this.transactionDate.setValue(currentDate);
    this.togglePreviewButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  saveAsImage() {
    let targetElement: any = document.getElementById("invoice");
    this.ps.createInvoiceImageFromHTML(targetElement);
  }

  saveAsPdf() {
    alert("Als PDF speichern?");
  }

  ngOnInit(): void {}
}
