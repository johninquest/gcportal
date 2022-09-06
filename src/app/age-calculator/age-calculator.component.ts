import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-age-calculator",
  templateUrl: "./age-calculator.component.html",
  styleUrls: ["./age-calculator.component.scss"],
})
export class AgeCalculatorComponent {
  constructor(
    private _calculator: CalculatorService,
    private _titleService: Title
  ) {
    this.setPageTitle();
  }
  ageForm = new FormGroup({
    selectedDate: new FormControl(""),
  });

  current_datetime = new Date();

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
    let _generation: object =
      this._calculator.generationFromDateOfBirth(pickedDate);
    return _generation;
  }

  formatDisplayedDate(dateStr: string) {
    if (dateStr) {
      let _formatted = new Date(dateStr);
      return _formatted;
    } else {
      return "";
    }
  }

  setPageTitle() {
    if (navigator.language.startsWith("de")) {
      this._titleService.setTitle("Altersrechner");
    } else {
      this._titleService.setTitle("Age Calculator");
    }
  }
}
