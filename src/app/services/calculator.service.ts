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
}
