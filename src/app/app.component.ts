import { Component, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './home/home.component';
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

  @ViewChild(HomeComponent, {static: false}) private importedHome: HomeComponent;
  
  startDocApp() {
    // alert('FUCK OFF');
    this.importedHome.msg();
  }

}


  /* title: string = 'A FWS App';
  
  callExtUrl() {
    const url = 'https://stuuur.com/en';
    open(url, '_self'); 
    alert('coming soon ...');
  } */