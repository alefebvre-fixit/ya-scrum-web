import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,    

  ]
})
export class MaterialModule { }
