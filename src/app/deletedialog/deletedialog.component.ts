import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private routeTo: Router) { }

    deleteYes() {
      sessionStorage.removeItem('savedInputData');
      this.dialogRef.close();
      this.routeTo.navigateByUrl('/startseite'); 
    }

    dialogCancel(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}
