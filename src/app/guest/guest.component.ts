import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
// import moment from "moment";
import dayjs from "dayjs";
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateFormats,
} from "@angular-material-components/datetime-picker";
import { PrintService } from "../services/print.service";

export const MY_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "DD.MM.YYYY HH:mm",
  },
  display: {
    dateInput: "DD.MM.YYYY HH:mm",
    monthYearLabel: "MM YYYY",
    dateA11yLabel: "DD.MM.YYYY HH:mm",
    monthYearA11yLabel: "DD.MM.YYYY HH:mm",
  },
};

@Component({
  selector: "app-guest",
  templateUrl: "./guest.component.html",
  styleUrls: ["./guest.component.css"],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class GuestComponent implements OnInit {
  @ViewChild("printElement") printElement: ElementRef;

  constructor(private ps: PrintService) {}

  toggleInput: boolean = true;
  togglePreview: boolean = false;
  toggleButtons: boolean = false;
  togglePageTitle: boolean = true;
  datetimeStamp: string;

  // Guest Data
  guestNames = new FormControl("", Validators.required);
  guestPhoneNumber = new FormControl("");
  guestEmail = new FormControl("", Validators.email);
  guestArrivalDateTime = new FormControl("");
  guestDepartureDateTime = new FormControl("");
  tableNumber = new FormControl("");
  numberOfAccompanyingPersons = new FormControl("");

  // Business Data
  businessName = new FormControl("", Validators.required);
  businessAddress = new FormControl("");
  businessPhoneNumber = new FormControl("");
  businessEmail = new FormControl("", Validators.email);

  @ViewChild("fromPicker") fromPicker: any;
  @ViewChild("toPicker") toPicker: any;
  public date: dayjs.Dayjs;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  public enableMeridian = false;
  public minDate: dayjs.Dayjs;
  public maxDate: dayjs.Dayjs;
  public stepHour = 1;
  public stepMinute = 1;
  public hideTime = false;
  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  public color: ThemePalette = "primary";

  printPreview() {
    // console.log(this.guestArrivalDateTime.value);
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
    this.togglePageTitle = false;
    this.datetimeStamp = dayjs().format("DD.MM.YYYY HH:mm");
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
    this.togglePageTitle = true;
  }

  formatPrintDateTime(dt: string) {
    if (dt) {
      let outputDateTime = dayjs(dt).format("DD.MM.YYYY HH:mm");
      return outputDateTime;
    } else {
      return "";
    }
  }

  saveAsImage() {
    let targetDiv: any = document.getElementById("printElement");
    this.ps.createImageFromHtml(targetDiv);
  }

  saveAsPdf() {
    let printData: object = {
      guestnames: this.guestNames.value,
      guestphone: this.guestPhoneNumber.value,
      guestemail: this.guestEmail.value,
      guestarrived: this.formatPrintDateTime(this.guestArrivalDateTime.value),
      tablenumber: this.tableNumber.value,
      accompanyingpersons: this.processNumberOfAccompanyingPersons(
        this.numberOfAccompanyingPersons.value
      ),
      guestdeparted: this.formatPrintDateTime(
        this.guestDepartureDateTime.value
      ),
      businessname: this.businessName.value,
      businessaddress: this.businessAddress.value,
      businessphone: this.businessPhoneNumber.value,
      businessemail: this.businessEmail.value,
    };
    this.ps.createPdfDoc(printData);
  }

  processNumberOfAccompanyingPersons(inputData: number) {
    if (inputData) {
      return inputData;
    } else {
      return 0;
    }
  }

  ucMessage() {
    alert("🚧 BAUSTELLE 🚧");
  }

  ngOnInit(): void {}
}

/* export class Picker {
  @ViewChild("fromPicker") fromPicker: any;
  @ViewChild("toPicker") toPicker: any;

  public date: dayjs.Dayjs;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: dayjs.Dayjs;
  public maxDate: dayjs.Dayjs;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = "primary";

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
} */
