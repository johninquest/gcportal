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
      // let diffD = now.diff(providedDate, "day");
      if (diffY >= 1) {
        // console.log("Age in years is => ", diffY);
        return `${diffY} Jahre`;
      }
      if (diffY < 1) {
        // let diffM = now.diff(providedDate, "month");
        // console.log("Age in months => ", diffM);
        return `${diffM} Monate`;
      }
      if (diffY < 1 && diffM < 1) {
        // let diffM = now.diff(providedDate, "month");
        console.log("Age in days => ", 0);
        return "";
      }
    } else {
      return "";
    }
  }
}
