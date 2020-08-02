import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  goToFacebook() {
    let targetUrl: string = "https://www.facebook.com/belego.de";
    window.open(targetUrl, "_blank");
    window.focus();
  }

  msg() {
    alert("🚧 IST NOCH EINE BAUSTELLE 🚧");
  }

  ngOnInit() {}
}
