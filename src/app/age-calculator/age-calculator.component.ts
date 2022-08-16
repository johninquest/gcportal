import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";

@Component({
  selector: "app-age-calculator",
  templateUrl: "./age-calculator.component.html",
  styleUrls: ["./age-calculator.component.scss"],
})
export class AgeCalculatorComponent {
  constructor(private cs: CalculatorService) {}
  ageForm = new FormGroup({
    selectedDate: new FormControl(""),
  });

  showAge(dateStr: any) {
    let ageFromDate = this.cs.ageFromDate2(dateStr);
    if (ageFromDate) {
      return ageFromDate;
    } else {
      return "";
    }
  }
}
