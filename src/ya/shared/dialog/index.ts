import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from './simple.dialog';
import { MaterialModule } from '@ya-scrum/material';
import { CovalentMessageModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CovalentMessageModule,
  ],
  declarations: [
    SimpleDialogComponent,
  ],
  exports: [
    SimpleDialogComponent,
  ],
  entryComponents: [SimpleDialogComponent],
  providers: []
})

export class DialogModule { }
export { SimpleDialogComponent } from './simple.dialog';
