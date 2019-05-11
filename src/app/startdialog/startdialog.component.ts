import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'app-startdialog',
  templateUrl: './startdialog.component.html',
  styleUrls: ['./startdialog.component.css']
})
export class StartdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StartdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    doGiveAwayWf() {
      sessionStorage.setItem('dgChoice', 'giveaway');
      this.dialogRef.close();
    }

    doSaleWf() {
      sessionStorage.setItem('dgChoice', 'sale');
      this.dialogRef.close();
    }

    cancelDialog():void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}
