import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import { PrintService } from "../services/print.service";
import dayjs from "dayjs";
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
  amountBeforeTax = new FormControl("", Validators.required);
  taxPercentage = new FormControl("");
  paidFor = new FormControl("");
  paidBy = new FormControl("");
  paidTo = new FormControl("");
  transactionLocation = new FormControl("");
  transactionDate = new FormControl({
    value: dayjs().format("DD.MM.YYYY"),
    disabled: true,
  });
  furtherDetails = new FormControl("");
  trSignature = new FormControl("");

  togglePageTitle: boolean = true;
  toggleInput: boolean = true;
  togglePreview: boolean = false;
  togglePreviewButtons: boolean = false;
  toggleBusinessData: boolean = false;

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  businessData = new FormGroup({
    businessName: new FormControl(""),
    businessAddress: new FormControl(""),
    businessPhone: new FormControl(""),
    businessEmail: new FormControl(""),
  });

  processDisplayedInputAmount(amtValue: number) {
    if (amtValue) {
      return amtValue.toFixed(2);
    } else {
      return "";
    }
  }

  showAfterTaxTotal() {
    let _amount: number = this.amountBeforeTax.value;
    let _tax: number = this.taxPercentage.value;
    if (_amount && _tax) {
      let calculatedTotalPlusTax = this.cs.calculateVAT(_amount, _tax);
      return (this.afterTaxTotal = calculatedTotalPlusTax);
    }
    if (_amount && !_tax) {
      return (this.afterTaxTotal = this.amountBeforeTax.value.toFixed(2));
    }
    if (!_amount && _tax) {
      return (this.afterTaxTotal = "0");
    } else {
      return "";
    }
  }

  previewInvoice() {
    let currentDateTime: string = dayjs().format("DD.MM.YYYY HH:mm");
    this.transactionDate.setValue(currentDateTime);
    this.togglePageTitle = false;
    this.toggleInput = false;
    this.togglePreview = true;
    this.togglePreviewButtons = true;
  }

  backToInput() {
    let currentDate: string = dayjs().format("DD.MM.YYYY");
    this.transactionDate.setValue(currentDate);
    this.togglePreviewButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
    this.togglePageTitle = true;
  }

  saveAsImage() {
    let targetElement: any = document.getElementById("invoice");
    this.ps.createInvoiceImageFromHTML(targetElement);
  }

  saveAsPdf() {
    let paymentFormData: object = {
      paymentNumber: this.invoiceNumber.value,
      // paymentDateTime: this.transactionDate.value,
      paymentLocation: this.transactionLocation.value,
      paymentAmountBeforeTax: this.amountBeforeTax.value,
      paymentTaxPercentage: this.taxPercentage.value,
      paymentAmountAfterTax: this.afterTaxTotal,
      paymentFor: this.paidFor.value,
      paymentBy: this.paidBy.value,
      paymentTo: this.paidTo.value,
      paymentExtraDetails: this.furtherDetails.value,
    };
    this.ps.createInvoicePdfFromData(paymentFormData);
  }

  saveBusinessData() {
    let formData: object = {
      business_name: this.businessData.get("businessName").value,
      business_address: this.businessData.get("businessAddress").value,
      business_phone: this.businessData.get("businessPhone").value,
      business_email: this.businessData.get("businessEmail").value,
    };
    console.log(formData);
    sessionStorage.setItem("belego_app_data", JSON.stringify(formData));
    // localStorage.setItem('belego_gi', 'Hello world!');
    // alert("Under construction");
    this.toggleBusinessData = false;
    this.togglePageTitle = true;
    this.toggleInput = true;
  }

  doNotSaveBusinessData() {
    this.toggleBusinessData = false;
    this.togglePageTitle = true;
    this.toggleInput = true;
  }

  showBusinessDataForm() {
    this.togglePageTitle = false;
    this.toggleInput = false;
    this.togglePreview = false;
    this.togglePreviewButtons = false;
    this.toggleBusinessData = true;
  }

  getSavedData() {
    let rawData = sessionStorage.getItem("belego_app_data");
    if (rawData) {
      let parsedRawData = JSON.parse(rawData);
      return [
        parsedRawData.business_name,
        parsedRawData.business_address,
        parsedRawData.business_phone,
        parsedRawData.business_email,
      ];
    } else {
      return ["", "", "", ""];
    }
  }

  ngOnInit(): void {
    // this.getSavedData();
  }
}
