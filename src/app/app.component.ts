import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { from } from 'rxjs';

declare const gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(router: Router) {
    const navEndEvent$ = router.events.pipe(filter(event => event instanceof NavigationEnd));
    navEndEvent$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-137248590-2', {'page_path': event.urlAfterRedirects});
    });
  }
}