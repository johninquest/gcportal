import { Component } from "@angular/core";
import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

declare const gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(router: Router, private translate: TranslateService) {
    const navEndEvent$ = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((event: NavigationEnd) => {
      gtag("config", "G-X53L36TCCL", { page_path: event.urlAfterRedirects });
    });
    translate.setDefaultLang(this.getBrowserLanguage(navigator.language));
  }

  getBrowserLanguage(sysLanguage: string) {
    let languageToLowerCase = sysLanguage.toLocaleLowerCase();
    let isFR = languageToLowerCase.startsWith("fr");
    if (isFR) {
      return "fr";
    } else {
      return "en";
    }
  }
}
