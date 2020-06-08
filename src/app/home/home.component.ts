import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rt: Router, private snackBar: MatSnackBar) {}

  showSnackBar() {
    setTimeout(() => {
      this.snackBar.openFromComponent(SnackBarMessage);
      // let snackbarRef = this.snackBar.open('Please take a look at our hygiene and safety tips in times of the coronavirus (COVID-19)', 'X', { duration: 10000 });
    }, 10000);
  }

  goToFacebook() {
    let targetUrl: string = 'https://www.facebook.com/mandiguide';
    window.open(targetUrl, '_blank');
    window.focus();
  }

  ngOnInit() {
    this.showSnackBar();
  }
}

@Component({
  selector: 'snack-message',
  template: `<p><span (click)="goToLink()">See our hygiene and safety tips in times of the coronavirus (COVID-19)</span>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <span (click)="closeSnackbar()">X</span></p>`,
  styles: [
    'span {cursor: pointer}'
   ]
})
export class SnackBarMessage {

  constructor(private rt: Router, private snackBar: MatSnackBar) {}

  goToLink() { 
    this.rt.navigateByUrl('/coronavirus');
    this.snackBar.dismiss();
  }

  closeSnackbar() { 
    this.snackBar.dismiss()
  }

}
