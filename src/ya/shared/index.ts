import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { PropertyTagModule } from './property-tag';
import { SectionTitleModule } from './section-title';
import { PageModule } from './page';
import { DialogModule } from './dialog';
import { LetterAvatarModule } from './letter-avatar';

@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule,
    DialogModule,
    LetterAvatarModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    PageModule,
    DialogModule,
    LetterAvatarModule,
    
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
export { SimpleDialogComponent } from './dialog';