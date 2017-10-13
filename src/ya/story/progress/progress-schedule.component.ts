import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';
import { ProgressEditDialogComponent } from './progress-edit.dialog';


@Component({
  selector: 'ya-story-progress-schedule',
  templateUrl: './progress-schedule.component.html',
  styleUrls: ['./progress-schedule.component.scss'],
})
export class StoryProgressScheduleComponent implements OnInit, OnChanges {

  @Input() story: Story;

  data: any[] = [
  ];

  columns: ITdDataTableColumn[] = [
    { name: 'day', label: 'Day #', tooltip: 'Sprint Day', numeric: false },
    { name: 'remaining', label: 'Remaining', numeric: true },
    { name: 'daily', label: 'Daily Progress', numeric: true },
    { name: 'trend', label: 'Trend' },
    { name: 'edit', label: '' },
  ];

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.extractData(this.story);
  }

  ngOnChanges(): void {
    this.extractData(this.story);
  }

  private extractData(story: Story) {
    if (story) {
      this.data = story.history;
    }
  }

  private edit(progress: StoryProgress) {

    const dialogRef = this.dialog.open(ProgressEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        story: this.story,
        progress: progress,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });

  }



}
