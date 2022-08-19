import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";

@Component({
  selector: "app-age-calculator",
  templateUrl: "./age-calculator.component.html",
  styleUrls: ["./age-calculator.component.scss"],
})
export class AgeCalculatorComponent {
  constructor(private _calculator: CalculatorService) {}
  ageForm = new FormGroup({
    selectedDate: new FormControl(""),
  });

  /*   showAge(dateStr: string) {
    let ageFromDate = this._calculator.ageFromDate2(dateStr);
    if (ageFromDate) {
      return ageFromDate;
    } else {
      return "";
    }
  } */

  showAgeInYears(pickedDate: string) {
    return this._calculator.ageFromDate(pickedDate)["inYears"];
  }

  showAgeInMonths(pickedDate: string) {
    return this._calculator.ageFromDate(pickedDate)["inMonths"];
  }

  showAgeInDays(pickedDate: string) {
    return this._calculator.ageFromDate(pickedDate)["inDays"];
  }

  showGeneration(pickedDate: string) {
    let _generation: string =
      this._calculator.generationFromDateOfBirth(pickedDate);
    return _generation;
  }
}
