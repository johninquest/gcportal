import { Component } from "@angular/core";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  constructor() {}

  /*   goToPaypal() {
    let targetUrl: string = "https://paypal.me/johnapps";
    window.open(targetUrl, "_blank");
    window.focus();
  } */

  showEmailAddress() {
    alert("demnächst verfügbar");
  }
}
