import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  constructor() {}

  /*  
  goToFacebook() {
    let targetUrl: string = "https://www.facebook.com/belego.de";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToInstagram() {
    let targetUrl: string = "https://www.instagram.com/belego.de";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToTwitter() {
    let targetUrl: string = "";
    window.open(targetUrl, "_blank");
    window.focus();
  }
*/
  showEmailAddress() {
    alert("demnächst verfügbar");
  }

  ngOnInit(): void {}
}
