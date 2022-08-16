import { Injectable } from "@angular/core";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  constructor() {}

  calculateVAT(amount: number, tax: number) {
    if (amount && tax) {
      const total_tax_paid = (tax / 100) * amount;
      const total_plus_tax = +total_tax_paid + +amount;
      return total_plus_tax.toFixed(2);
    }
    if (tax === 0) {
      return amount.toFixed(2);
    }
  }

  ageFromDate(providedDate: string) {
    if (providedDate) {
      let now = dayjs(new Date());
      let diff = now.diff(providedDate, "year");
      return diff;
    } else {
      return "";
    }
  }

  ageFromDate2(providedDate: string) {
    if (providedDate) {
      let now = dayjs(new Date());
      let diffY = now.diff(providedDate, "year");
      let diffM = now.diff(providedDate, "month");
      let diffD = now.diff(providedDate, "day");
      if (diffY >= 1) {
        return `${diffY} ${this.setAgeUnit().year}`;
      }
      if (diffY < 1 && diffM >= 1) {
        return `${diffM} ${this.setAgeUnit().month}`;
      }
      if (diffY < 1 && diffM < 1) {
        return `${diffD} ${this.setAgeUnit().day}`;
      }
    } else {
      return "";
    }
  }

  setAgeUnit() {
    if (navigator.language.startsWith("de")) {
      let _days: string = "Tage";
      let _months: string = "Monate";
      let _years: string = "Jahre";
      return { day: _days, month: _months, year: _years };
    } else {
      let _days: string = "days";
      let _months: string = "months";
      let _years: string = "years";
      return { day: _days, month: _months, year: _years };
    }
  }
}
