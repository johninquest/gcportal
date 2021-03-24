import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-solutions",
  templateUrl: "./solutions.component.html",
  styleUrls: ["./solutions.component.css"],
})
export class SolutionsComponent implements OnInit {
  constructor() {}

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

  goToQuittungApp() {
    let targetUrl: string = "https://belego.de/quittung";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  ngOnInit(): void {}
}
