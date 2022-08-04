import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  constructor() {}

  /*   goToPaypal() {
    let targetUrl: string = "https://paypal.me/johnapps";
    window.open(targetUrl, "_blank");
    window.focus();
  } */

  messageForm = new FormGroup({
    senderName: new FormControl<string | null>("", Validators.required),
    senderEmail: new FormControl<string | null>("", [
      Validators.required,
      Validators.email,
    ]),
    senderMessage: new FormControl<string | null>("", Validators.required),
  });

  showEmailAddress() {
    alert("demnächst verfügbar");
  }

  onClickSubmit() {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
    } else {
      console.log(this.messageForm.value);
      alert("Under construction!");
    }
  }
}
