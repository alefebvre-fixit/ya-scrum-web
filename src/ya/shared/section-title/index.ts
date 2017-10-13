import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent, SectionTitleHighlight, SectionButtonBar } from './section-title.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SectionTitleComponent,
     SectionTitleHighlight,
     SectionButtonBar
    ],
  exports: [
    SectionTitleComponent,
     SectionTitleHighlight,
     SectionButtonBar
    ],
  entryComponents: [],
  providers: []
})

export class SectionTitleModule { }
