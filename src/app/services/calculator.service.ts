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
      let diffY: number = now.diff(providedDate, "year");
      let diffM: number = now.diff(providedDate, "month");
      let diffD: number = now.diff(providedDate, "day");
      let _age: object = {
        inYears: diffY,
        inMonths: diffM,
        inDays: diffD,
      };
      return _age;
    } else {
      let _age: object = {
        inYears: 0,
        inMonths: 0,
        inDays: 0,
      };
      return _age;
    }
  }
  /* 
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
 */
  generationFromDateOfBirth(providedDate: string) {
    let _yearOfBirth: number = dayjs(providedDate).year() ?? 0;
    if (_yearOfBirth >= 1928 && _yearOfBirth <= 1945) {
      return "silent";
    }
    if (_yearOfBirth >= 1946 && _yearOfBirth <= 1964) {
      return "boomer";
    }
    if (_yearOfBirth >= 1965 && _yearOfBirth <= 1980) {
      return "x";
    }
    if (_yearOfBirth >= 1981 && _yearOfBirth <= 1996) {
      return "y";
    }
    if (_yearOfBirth >= 1997 && _yearOfBirth <= 2010) {
      return "z";
    }
    if (_yearOfBirth >= 2011 && _yearOfBirth <= 2025) {
      return "alpha";
    }
  }
}
