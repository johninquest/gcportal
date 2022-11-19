import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { REQUEST_REASONS, CLASS_LETTERS, CLASS_NUMBERS } from "../shared/lists";
import { ListDataTypeDescriptor } from "../shared/descriptor";
import { WebService } from "../services/web.service";
import dayjs from "dayjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent {
  constructor(
    private _ws: WebService,
    private _snackBar: MatSnackBar,
    private _translate: TranslateService,
    private _router: Router
  ) {
    _translate.setDefaultLang(this.getBrowserLanguage(navigator.language));
  }

  getBrowserLanguage(sysLanguage: string) {
    let languageToLowerCase = sysLanguage.toLocaleLowerCase();
    let isFR = languageToLowerCase.startsWith("fr");
    if (isFR) {
      return "fr";
    } else {
      return "en";
    }
  }

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
        created_at: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
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
          // console.log("Insert ok response:", res);
          this._snackBar.open(
            "Your request was submitted successfully!",
            "OK",
            { duration: 3000 }
          );
          this._router.navigateByUrl("");
        })
        .catch((err) => console.log("Insert error response:", err));
    }
  }

  onClickBack() {
    history.back();
  }
}
