import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { SprintStoryCardComponent } from './sprint-story-card.component';
import { SprintStoryCardNewComponent } from './sprint-story-card-new.component';
import { SprintStoryGridComponent } from './sprint-story-grid.component';
import { SprintStorySelectorComponent } from './sprint-story-selector.component';

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
    CovalentCommonModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentMessageModule,
    SharedModule,
    StoryModule,
  ],
  declarations: [
    SprintStoryCardComponent,
    SprintStoryGridComponent,
    SprintStorySelectorComponent,
    SprintStoryCardNewComponent,
  ],
  exports: [
    SprintStoryCardComponent,
    SprintStoryGridComponent,
    SprintStorySelectorComponent,
    SprintStoryCardNewComponent,
  ],
  providers: [
  ],
  entryComponents: [
    SprintStorySelectorComponent
  ],
})

export class SprintStoryModule { }
