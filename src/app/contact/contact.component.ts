import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { REQUEST_REASONS, CLASS_LETTERS, CLASS_NUMBERS } from "../shared/lists";
import { ListDataTypeDescriptor } from "../shared/descriptor";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  constructor() {}

  contactForm = new FormGroup({
    reasonForRequest: new FormControl<string | null>("", Validators.required),
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

  showEmailAddress() {
    alert("demnächst verfügbar");
  }

  onClickSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
    } else {
      console.log(this.contactForm.value);
      alert("Under construction!");
    }
  }

  onClickBack() {
    history.back();
  }
}
