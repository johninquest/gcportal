import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-solutions",
  templateUrl: "./solutions.component.html",
  styleUrls: ["./solutions.component.css"],
})
export class SolutionsComponent implements OnInit {
  constructor() {}

  showCalculator: boolean;

  toggleCalculator() {
    if (navigator.language == "de") {
      return (this.showCalculator = true);
    } else {
      return (this.showCalculator = false);
    }
  }

  goToPazeApp() {
    let targetUrl: string =
      "https://play.google.com/store/apps/details?id=de.johnapps.mytime";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToCoinEckeApp() {
    let targetUrl: string =
      "https://play.google.com/store/apps/details?id=de.example.cpapp";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  /*   goToQuittungApp() {
    let targetUrl: string = "https://belego.de/quittung";
    window.open(targetUrl, "_blank");
    window.focus();
  } */

  ngOnInit(): void {
    this.toggleCalculator();
  }
}
