import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor() {}

  selectedLanguage = new FormControl("en");

  languages: Language[] = [
    { value: "en", viewValue: "EN" },
    { value: "de", viewValue: "DE" },
  ];

  changeLanguage() {
    console.log("Language has changed!");
  }

  onChanges(): void {
    this.selectedLanguage.valueChanges.subscribe(() => this.changeLanguage());
  }

  ngOnInit(): void {}
}
