import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentDataTableModule } from '@covalent/core';

import { StoryProgressScheduleComponent} from './progress-schedule.component';
import { ProgressEditDialogComponent} from './progress-edit.dialog';
import { ProgressViewComponent} from './progress-view.component';

import { SharedModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentDataTableModule,
    SharedModule,
  ],
  declarations: [
    StoryProgressScheduleComponent,
    ProgressEditDialogComponent,
    ProgressViewComponent,
  ],
  exports: [
    StoryProgressScheduleComponent,
    ProgressEditDialogComponent,
    ProgressViewComponent,
  ],
  entryComponents: [
    ProgressEditDialogComponent,
  ],
  providers: [
  ]
})

export class StoryProgressModule { }

export { StoryProgressScheduleComponent } from './progress-schedule.component';
export { ProgressEditDialogComponent } from './progress-edit.dialog';
export { ProgressViewComponent } from './progress-view.component';