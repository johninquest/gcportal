import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { WebService } from "../services/web.service";
import { ListDataTypeDescriptor } from "../shared/descriptor";
import { SCHOOLS } from "../shared/lists";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _ws: WebService
  ) {}

  tableData: any;

  selectedSchool = new FormControl<string | null>("", Validators.required);

  schoolsList: ListDataTypeDescriptor[] = SCHOOLS;

  comingSoonMessage() {
    alert("Demnächst verfügbar");
  }

  errorMessage() {
    if (this.selectedSchool.hasError("required")) {
      return "Please select your school from the list!";
    }
  }

  onClickProceed() {
    if (this.selectedSchool.invalid) {
      this.selectedSchool.markAllAsTouched();
    } else if (this.selectedSchool.value === "nyalla") {
      this._router.navigateByUrl("/request");
      // this._router.navigate([])
    } else {
      this._snackBar.open("The selected school is not yet supported!", "OK", {
        duration: 5000,
      });
    }
  }

  /*   fetchRequests() {
    this._ws
      .getSubmittedReqs()
      .then((data) => (this.tableData = data["data"]))
      .catch((err) => console.log(err));
  } */
}
