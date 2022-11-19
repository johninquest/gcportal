import { Injectable } from "@angular/core";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class DatetimeService {
  constructor() {}

  dateTimeFormatted(currentDateTime: Date) {
    let _formattedTs: string = dayjs(currentDateTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    return _formattedTs;
  }
}
