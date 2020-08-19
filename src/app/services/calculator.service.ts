import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  constructor() {}

  calculateVAT(amount: number, tax: number) {
    if (amount && tax) {
      const total_tax_paid = (tax / 100) * amount;
      const total_plus_tax = +total_tax_paid + +amount;
      // console.log(total_plus_tax);
      return total_plus_tax.toFixed(2);
    }
    if (tax === 0) {
      // console.log(amount);
      return amount.toFixed(2);
    }
  }
}
