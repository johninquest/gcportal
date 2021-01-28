import { Component } from "@angular/core";
import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { from } from "rxjs";

declare const gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(router: Router) {
    const navEndEvent$ = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((event: NavigationEnd) => {
      gtag("config", "G-KT1LBY6JRB", { page_path: event.urlAfterRedirects });
    });
  }
}
