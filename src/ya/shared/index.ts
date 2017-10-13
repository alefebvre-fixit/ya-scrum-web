import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { PropertyTagModule } from './property-tag';
import { SectionTitleModule } from './section-title';
import { PageModule } from './page';

@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
