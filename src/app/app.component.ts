import { Component } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

declare const gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  /* title: string = 'A FWS App'; */

  callExtUrl() {
    const url = 'https://stuuur.com/en';
    open(url, '_self');
    // alert('coming soon!');
  }

  constructor(router: Router) {
    const navEndEvent$ = router.events.pipe(filter(event => event instanceof NavigationEnd));
    navEndEvent$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-137248590-2', {'page_path': event.urlAfterRedirects});
    });
  }
}
