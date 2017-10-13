import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SprintBurndownComponent } from './sprint-burndown.component';
import { SprintBurndownNewComponent } from './sprint-burndown-new.component';

import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryModule } from '../../story';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoryModule,
  ],
  declarations: [
    SprintBurndownComponent,
    SprintBurndownNewComponent,
  ],
  exports: [
    SprintBurndownComponent,
    SprintBurndownNewComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
})

export class BurnDownModule { }
