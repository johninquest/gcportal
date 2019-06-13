import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { from } from 'rxjs';


@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatMenuModule,
      MatSelectModule,
      MatListModule,
      MatIconModule,
      MatTableModule,
      MatMomentDateModule,
      MatStepperModule,
      MatDialogModule,
      MatTooltipModule
],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatMenuModule,
      MatSelectModule,
      MatListModule,
      MatIconModule,
      MatTableModule,
      MatMomentDateModule,
      MatStepperModule,
      MatDialogModule,
      MatTooltipModule
    ],
})
export class MaterialModule { }
