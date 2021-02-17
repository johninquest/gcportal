import { Component, OnInit } from "@angular/core";
// import { FormControl } from "@angular/forms";
// import { TranslateService } from "@ngx-translate/core";

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

  /*   constructor(private translate: TranslateService) {
    // translate.addLangs(["en", "de"]);
    translate.setDefaultLang(this.getBrowserLanguage(navigator.language));
  }

  getBrowserLanguage(sysLanguage: string) {
    let languageToLowerCase = sysLanguage.toLocaleLowerCase();
    let isDE = languageToLowerCase.startsWith("de");
    if (isDE) {
      return "de";
    } else {
      return "en";
    }
  }

  selectedLanguage = new FormControl("en");

  languages: Language[] = [
    { value: "en", viewValue: "EN" },
    { value: "de", viewValue: "DE" },
  ];

  useLanguage(myValue: string) {
    console.log("Language has changed!");
    console.log(this.selectedLanguage.value);
    this.translate.use(this.selectedLanguage.value);
  }
 */
  ngOnInit(): void {}
}
