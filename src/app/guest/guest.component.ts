import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
// import 'moment/locale/de';
// moment.locale('de');

@Component({
  selector: "app-guest",
  templateUrl: "./guest.component.html",
  styleUrls: ["./guest.component.css"],
})
export class GuestComponent implements OnInit {
  constructor() {}

  toggleInput: boolean = true;
  togglePreview: boolean = false;
  toggleButtons: boolean = false;
  datetimeStamp: string;

  // Guest Data
  guestNames = new FormControl("", [Validators.required]);
  // guestAddress = new FormControl("");
  guestPhoneNumber = new FormControl("");
  guestEmail = new FormControl("", [Validators.email]);
  guestArrivalDate = new FormControl("");
  guestDepartureDate = new FormControl("");
  tableNumber = new FormControl("");

  // Business Data
  businessName = new FormControl("", [Validators.required]);
  businessAddress = new FormControl("");
  businessPhoneNumber = new FormControl("");
  businessEmail = new FormControl("", [Validators.email]);

  preview() {
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
    // console.log(this.guestInfoForm.value);

    // this.datetimeStamp = moment().format('LLL');
    this.datetimeStamp = moment().locale("de").format("LLL");
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  formatPrintDateTime(dt: string) {
    if (dt) {
      let outputDate: string = moment(dt).locale("de").format("L");
      let outputTime: string = moment(dt).locale("de").format("LT");
      let outputDateTime = outputDate + " " + outputTime;
      return outputDateTime;
    } else {
      return "";
    }
  }

  saveAsImage() {
    this.ucMessage();
  }

  saveAsPdf() {}

  ucMessage() {
    alert("🚧 BAUSTELLE 🚧");
  }

  ngOnInit(): void {}
}
