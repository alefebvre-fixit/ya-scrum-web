import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { PropertyTagModule } from './property-tag';
import { SectionTitleModule } from './section-title';
import { PageModule } from './page';
import { DialogModule } from './dialog';

@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule,
    DialogModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule,
    DialogModule
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
export { SimpleDialogComponent } from './dialog';