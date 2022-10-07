import { Component, OnInit } from "@angular/core";
// import { Router } from "@angular/router";

@Component({
  selector: "app-solutions",
  templateUrl: "./solutions.component.html",
  styleUrls: ["./solutions.component.scss"],
})
export class SolutionsComponent {
  constructor() {}
  /*   ngOnInit(): void {
    this.toggleCalculator();
  } */

  /*   showCalculator: boolean;

  toggleCalculator() {
    if (navigator.language.startsWith("de")) {
      return (this.showCalculator = true);
    } else {
      return (this.showCalculator = false);
    }
  } */

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

  goToLdgrApp() {
    let targetUrl: string = "https://ldgr-erp.web.app";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToZetApp() {
    let targetUrl: string = "https://zeiterfassungstool.web.app";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  goToTaxApp() {
    let targetUrl: string = "https://johninquest.github.io/tax-app";
    window.open(targetUrl, "_blank");
    window.focus();
  }
}
