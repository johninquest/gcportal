import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  constructor() {}

  /*   goToPaypal() {
    let targetUrl: string = "https://paypal.me/johnapps";
    window.open(targetUrl, "_blank");
    window.focus();
  } */

  showEmailAddress() {
    alert("demnächst verfügbar");
  }

  ngOnInit(): void {}
}
