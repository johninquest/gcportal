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

  generationFromDateOfBirth(providedDate: string) {
    let _yearOfBirth: number = dayjs(providedDate).year() ?? 0;
    if (_yearOfBirth >= 1883 && _yearOfBirth <= 1900) {
      let gen_details: object = {
        name: "lost",
        period: "1883 - 1900",
        other_names: "Generation of 1914",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1901 && _yearOfBirth <= 1927) {
      let gen_details: object = {
        name: "great",
        period: "1901 - 1927",
        other_names: "G.I. Generation",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1928 && _yearOfBirth <= 1945) {
      let gen_details: object = {
        name: "silent",
        period: "1928 - 1945",
        other_names: "Lucky Few",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1946 && _yearOfBirth <= 1964) {
      let gen_details: object = {
        name: "boomers",
        period: "1946 - 1964",
        other_names: "Baby Boomers",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1965 && _yearOfBirth <= 1980) {
      let gen_details: object = {
        name: "x",
        period: "1965 - 1980",
        other_names: "Gen X",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1981 && _yearOfBirth <= 1996) {
      let gen_details: object = {
        name: "y",
        period: "1981 - 1996",
        other_names: "Millennials",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 1997 && _yearOfBirth <= 2010) {
      let gen_details: object = {
        name: "z",
        period: "1997 - 2010",
        other_names: "Gen Z",
      };
      return gen_details;
    }
    if (_yearOfBirth >= 2011 && _yearOfBirth <= 2025) {
      let gen_details: object = {
        name: "alpha",
        period: "2011 - 2025",
        other_names: "Gen Alpha",
      };
      return gen_details;
    } else {
      let gen_details: object = {
        name: "",
        period: "",
        other_names: "",
      };
      return gen_details;
    }
  }
}
