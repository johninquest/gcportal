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

  /*   updateCache() {
    if (this.swUpdate.available) {
      window.location.reload();
    }
  } */

  ngOnInit() {}
}
