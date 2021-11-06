import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";

@Component({
  selector: "app-age-calculator",
  templateUrl: "./age-calculator.component.html",
  styleUrls: ["./age-calculator.component.css"],
})
export class AgeCalculatorComponent implements OnInit {
  constructor(private cs: CalculatorService) {}
  ageForm = new FormGroup({
    selectedDate: new FormControl(""),
    // ageInYears: new FormControl(""),
  });

  showAge(dateStr: any) {
    let ageFromDate = this.cs.ageFromDate(dateStr);
    if (ageFromDate) {
      return `${ageFromDate} Jahre`;
    } else if (ageFromDate === 0) {
      return "0 Jahre";
    } else {
      return "";
    }
  }

  ngOnInit(): void {}
}
