import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'app-startdialog',
  templateUrl: './startdialog.component.html',
  styleUrls: ['./startdialog.component.css']
})
export class StartdialogComponent implements OnInit {

  giveaway: string;
  sale: string;

  constructor(public dialogRef: MatDialogRef<StartdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    doGiveAwayWf() {
      sessionStorage.setItem('dg_choice', 'giveaway');
      this.dialogRef.close();
    }

    doSaleWf() {
      sessionStorage.setItem('dg_choice', 'sale');
      this.dialogRef.close();
    }

    cancelDialog() {
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}
