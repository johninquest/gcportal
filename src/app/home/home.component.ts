import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {}

  goToFacebook() {
    let targetUrl: string = "https://www.facebook.com/belego.de";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToCoinEcke() {
    let targetUrl: string =
      "https://play.google.com/store/apps/details?id=de.example.cpapp";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToQuittungApp() {
    let targetUrl: string = "https://belego.de/quittung";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  comingSoonMessage() {
    alert("DEMNÄCHST VERFÜGBAR");
  }

  ngOnInit() {}
}
