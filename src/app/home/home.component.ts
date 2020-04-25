import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private rt: Router, private snackBar: MatSnackBar) {}

  goToFacebook() {
    let targetUrl: string = 'https://www.facebook.com/mandiguide';
    window.open(targetUrl, '_blank');
    window.focus();
  }

  popUpDialog() {
    setTimeout(() => {
      let snackbarRef = this.snackBar.open('Please take a look at our hygiene and safety tips in times of the coronavirus (COVID-19).', 'YES, SHOW ME', { duration: 30000 });
      snackbarRef.onAction().subscribe(() => this.rt.navigateByUrl('/coronavirus'));
    }, 10000);
  }

  ngOnInit() {
    this.popUpDialog();
  }
}
