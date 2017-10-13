import { Component, OnInit, Input } from '@angular/core';

import { Sprint } from '@ya-scrum/models';
import { SprintService } from '@ya-scrum/services';

import { Router } from '@angular/router';

@Component({
  selector: 'ya-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent {

  @Input() sprint: Sprint;

  constructor(private router: Router
  ) {
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/sprints/${id}`]);
  }

  public progressAsPercentage(): number {
    return SprintService.progressAsPercentage(this.sprint);
  }

  public dayToGo(): number {
    return this.sprint.duration  - this.sprint.meeting.day;
  }

}
