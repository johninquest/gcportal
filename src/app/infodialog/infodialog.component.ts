import { Component, Inject } from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";

@Component({
  selector: "app-infodialog",
  templateUrl: "./infodialog.component.html",
  styleUrls: ["./infodialog.component.scss"],
})
export class InfodialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: object,
    private _dialogRef: MatDialogRef<any>
  ) {}

  onDismiss(): void {
    this._dialogRef.close();
  }
}
