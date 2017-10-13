import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { SprintService } from '@ya-scrum/services';
import { Sprint } from '@ya-scrum/models';

import { SprintEditDialogComponent } from './sprint-edit.dialog';

@Component({
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.scss']
})
export class SprintDashboardComponent implements OnInit {

  public sprintsProgress: Sprint[];
  public sprintsPending: Sprint[];
  public sprintsClosed: Sprint[];

  public status = 'progress';

  constructor(
    private router: Router,
    public sprintService: SprintService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {

    this.sprintService.findByStatus('pending').subscribe((sprints: Sprint[]) => {
      this.sprintsPending = sprints;
    });

    this.sprintService.findByStatus('progress').subscribe((sprints: Sprint[]) => {
      this.sprintsProgress = sprints;
    });

    this.sprintService.findByStatus('closed').subscribe((sprints: Sprint[]) => {
      this.sprintsClosed = sprints;
    });

  }


  addSprint(): void {
    const dialogRef = this.dialog.open(SprintEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        sprint: this.sprintService.instanciate(),
      }
    });
    dialogRef.afterClosed().subscribe(sprint => {
      if (sprint && sprint.id) {
        this.router.navigate([`/sprints/${sprint.id}`]);
      }
    });
  }

}
