import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTagComponent } from './property-tag.component';
import { HighlightTagComponent } from './highlight-tag.component';
import { MaterialModule } from '@ya-scrum/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PropertyTagComponent, 
    HighlightTagComponent
  ],
  exports: [
    PropertyTagComponent, 
    HighlightTagComponent
  ],
  entryComponents: [],
  providers: []
})

export class PropertyTagModule { }
