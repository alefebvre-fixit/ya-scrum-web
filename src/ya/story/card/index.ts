import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { StoryCardComponent } from './story-card.component';

import { PipeModule } from '@ya-scrum/pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
    PipeModule
  ],
  declarations: [
    StoryCardComponent,
  ],
  exports: [
    StoryCardComponent,
  ],
  entryComponents: [
  ],
  providers: [
  ]
})

export class StoryCardModule { }
