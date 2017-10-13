import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PageComponent,
  ],
  exports: [
    PageComponent,
  ],
  entryComponents: [],
  providers: []
})

export class PageModule { }
