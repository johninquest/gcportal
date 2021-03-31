import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  goToUrl(targetUrl: string) {
    window.open(targetUrl, "_blank");
    window.focus();
  }

  ngOnInit(): void {}
}
