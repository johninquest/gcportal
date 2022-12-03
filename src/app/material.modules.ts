import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
// import { MatCheckboxModule } from "@angular/material/checkbox";
// import { MatNativeDateModule } from "@angular/material/core";
// import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
// import { MatRadioModule } from "@angular/material/radio";
// import { MatMenuModule } from "@angular/material/menu";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
// import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
// import { MatTableModule } from "@angular/material/table";
// import { MatStepperModule } from "@angular/material/stepper";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
// import { MatExpansionModule } from "@angular/material/expansion";
// import { MatCardModule } from "@angular/material/card";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
// import { MatButtonToggleModule } from "@angular/material/button-toggle";
// import { from } from "rxjs";

@NgModule({
  imports: [
    MatButtonModule,
    /*   MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule, */
    MatFormFieldModule,
    MatInputModule,
    /* MatRadioModule,
    MatMenuModule, */
    MatSelectModule,
    /* MatListModule, */
    MatIconModule,
    /*  MatTableModule,
    MatStepperModule, */
    MatDialogModule,
    MatTooltipModule,
    /*  MatExpansionModule,
    MatCardModule, */
    MatSnackBarModule,
    /*  MatButtonToggleModule, */
  ],
  exports: [
    MatButtonModule,
    /* MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule, */
    MatFormFieldModule,
    MatInputModule,
    /*  MatRadioModule,
    MatMenuModule, */
    MatSelectModule,
    /*  MatListModule, */
    MatIconModule,
    /*  MatTableModule,
    MatStepperModule, */
    MatDialogModule,
    MatTooltipModule,
    /*  MatExpansionModule,
    MatCardModule, */
    MatSnackBarModule,
    /*  MatButtonToggleModule, */
  ],
})
export class MaterialModules {}
