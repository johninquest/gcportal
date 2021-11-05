import { Component } from "@angular/core";

interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent {
  constructor() {}
}
