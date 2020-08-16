import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  constructor() {}

  calculateVAT(requestedVAT: number) {
    let calculatedVAT: number = 10;
    let calculatedTotal: number = 25;
    return [calculatedVAT, calculatedTotal];
  }
}
