import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';
import { MaterialModule } from '@ya-scrum/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    TrendComponent
  ],
  exports: [
    TrendComponent
  ],
  entryComponents: [],
  providers: []
})

export class TrendModule { }
