import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { REQUEST_REASONS, CLASS_LETTERS, CLASS_NUMBERS } from "../shared/lists";
import { ListDataTypeDescriptor } from "../shared/descriptor";
import { WebService } from "../services/web.service";
import dayjs from "dayjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  constructor(private _ws: WebService, private _snackBar: MatSnackBar) {}

  contactForm = new FormGroup({
    requestCategory: new FormControl<string | null>("", Validators.required),
    isUrgent: new FormControl<string | null>(""),
    additionalDetails: new FormControl<string | null>(""),
    studentId: new FormControl<string | null>("", Validators.required),
    surname: new FormControl<string | null>(""),
    givenNames: new FormControl<string | null>(""),
    classNumber: new FormControl<string | null>("", Validators.required),
    classLetter: new FormControl<string | null>(""),
  });

  classLetterList: ListDataTypeDescriptor[] = CLASS_LETTERS;
  classNumberList: ListDataTypeDescriptor[] = CLASS_NUMBERS;
  requestReasonsList: ListDataTypeDescriptor[] = REQUEST_REASONS;

  onClickSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
    } else {
      let _supabasePayload: object = {
        request_dt: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        request_category: this.contactForm.value.requestCategory,
        is_urgent: this.contactForm.value.isUrgent,
        request_details: this.contactForm.value.additionalDetails,
        student_id: this.contactForm.value.studentId,
        surname: this.contactForm.value.surname,
        given_names: this.contactForm.value.givenNames,
        class_number: this.contactForm.value.classNumber,
        class_letter: this.contactForm.value.classLetter,
      };
      // console.log("Form data: ", this.contactForm.value);
      // console.log("Payload data: ", _supabasePayload);
      this._ws
        .addRowToDB(_supabasePayload)
        .then((res) => {
          console.log("Insert ok response:", res);
          this._snackBar.open(
            "Your request was submitted successfully!",
            "OK",
            { duration: 3000 }
          );
        })
        .catch((err) => console.log("Insert error response:", err));
    }
  }

  onClickBack() {
    history.back();
  }
}
