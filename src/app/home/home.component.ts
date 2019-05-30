import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StartdialogComponent } from '../startdialog/startdialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hTitle: string = 'stuuur';
  hBeleg = 'Beleg';
  hWetter = 'Wetter';


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
    this.dialog.open(StartdialogComponent);
    // const dialogRef = this.dialog.open(StartdialogComponent, {});
  }

  ngOnInit() { }
}
