import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.scss"],
})
export class DownloadsComponent {
  constructor() {}

  startDownload() {
    let targetUrl: string =
      "https://firebasestorage.googleapis.com/v0/b/johnappsde.appspot.com/o/ldgr-app-v15.apk?alt=media&token=6b3ba3f9-8b0a-4030-8b68-63ddcc891c1d";
    window.open(targetUrl, "_self");
    window.focus();
  }

  comingSoon() {
    alert("Version coming soon");
  }
}
