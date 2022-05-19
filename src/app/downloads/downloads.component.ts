import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.scss"],
})
export class DownloadsComponent {
  constructor() {}

  startDownloadV15() {
    let targetUrl: string =
      "https://firebasestorage.googleapis.com/v0/b/johnappsde.appspot.com/o/ldgr-app-v15.apk?alt=media&token=6b3ba3f9-8b0a-4030-8b68-63ddcc891c1d";
    window.open(targetUrl, "_self");
    window.focus();
  }

  startDownloadV16() {
    let targetUrl: string =
      "https://firebasestorage.googleapis.com/v0/b/johnappsde.appspot.com/o/ldgr-app-v16.apk?alt=media&token=4085d26a-5b25-4712-908a-ed1f4de8e188";
    window.open(targetUrl, "_self");
  }

  comingSoon() {
    alert("Version coming soon");
  }
}
