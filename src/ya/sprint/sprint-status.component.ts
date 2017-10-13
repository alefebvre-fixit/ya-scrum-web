import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  selector: 'ya-sprint-status',
  templateUrl: './sprint-status.component.html',
  styleUrls: ['./sprint-status.component.scss'],
})
export class SprintStatusComponent {

  @Input() sprint: Sprint;

  public progressAsPercentage(): number {
    return SprintService.progressAsPercentage(this.sprint);
  }

}
