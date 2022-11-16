import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ListDataTypeDescriptor } from "../shared/descriptor";
import { SCHOOLS } from "../shared/lists";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(private _router: Router, private _snackBar: MatSnackBar) {}
  /* ngOnInit() {} */

  selectedSchool = new FormControl<string | null>("", Validators.required);

  schoolsList: ListDataTypeDescriptor[] = SCHOOLS;

  comingSoonMessage() {
    alert("Demnächst verfügbar");
  }

  onClickProceed() {
    if (this.selectedSchool.invalid) {
      this.selectedSchool.markAllAsTouched();
    } else if (this.selectedSchool.value === "nyalla") {
      this._router.navigateByUrl("/contact");
    } else {
      // alert("The selected school is not supported!");
      this._snackBar.open("The selected school is not yet supported!", "OK", {
        duration: 3000,
      });
    }
  }
}
