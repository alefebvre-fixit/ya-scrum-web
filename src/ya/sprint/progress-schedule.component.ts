import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';


@Component({
  selector: 'ya-sprint-progress-schedule',
  templateUrl: './progress-schedule.component.html',
  styleUrls: ['./progress-schedule.component.scss'],
})
export class SprintProgressScheduleComponent implements OnInit, OnChanges {

  @Input() progressHistory: SprintProgress[];

  data: any[] = [
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'day', label: 'Day #', tooltip: 'Sprint Day', numeric: false },
    { name: 'remaining', label: 'Remaining', numeric: true },
    { name: 'daily', label: 'Daily Progress', numeric: true },
    { name: 'trend', label: 'Trend' },
  ];

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
