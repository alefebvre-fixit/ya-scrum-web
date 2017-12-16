import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { NgxCroppieModule } from '@ya-scrum/croppie';


import { SprintCardComponent } from './sprint-card.component';
import { SprintGridComponent, SprintGridTitleDirective } from './sprint-grid.component';
import { SprintDashboardComponent } from './sprint-dashboard.component';
import { SprintViewComponent } from './sprint-view.component';
import { SprintEditDialogComponent } from './sprint-edit.dialog';
import { SprintStatusComponent } from './sprint-status.component';
import { SprintProgressScheduleComponent } from './progress-schedule.component';

import { SprintBackgroundDialogComponent } from './sprint-background.dialog';

import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryModule } from '../story';
import { BurnDownModule } from './burndown';
import { SprintStoryModule } from './story';

import { SharedModule } from '../shared';

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
    NgxCroppieModule,
    SharedModule,
    StoryModule,
    SprintStoryModule,
    BurnDownModule
  ],
  declarations: [
    SprintCardComponent,
    SprintGridComponent,
    SprintGridTitleDirective,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintStatusComponent,
    SprintEditDialogComponent,
    SprintProgressScheduleComponent,
    SprintBackgroundDialogComponent
  ],
  exports: [
    SprintCardComponent,
    SprintGridComponent,
    SprintGridTitleDirective,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintEditDialogComponent,
    SprintBackgroundDialogComponent
  ],
  providers: [
  ],
  entryComponents: [
    SprintEditDialogComponent, SprintBackgroundDialogComponent
  ],
})

export class SprintModule { }

export { SprintViewComponent } from './sprint-view.component';
export { SprintDashboardComponent} from './sprint-dashboard.component';