import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StartdialogComponent } from '../startdialog/startdialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'stuuur';
  info = 'los legen';

// Clears or deletes all data in session storage
  clearSessionStorage() {
    sessionStorage.clear();
  }  

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '50%';
    // this.dialog.open(StartdialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(StartdialogComponent, {});
  }

  ngOnInit() { }
}
