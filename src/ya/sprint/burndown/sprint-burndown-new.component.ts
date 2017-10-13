import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Story, StoryProgress } from '@ya-scrum/models';
import { StoryService } from '@ya-scrum/services';

@Component({
  selector: 'ya-sprint-burndown-new',
  templateUrl: './sprint-burndown-new.component.html',
  styleUrls: ['./sprint-burndown-new.component.scss']
})
export class SprintBurndownNewComponent {

  @Input()
  stories: Story[];

  @Output()
  onStart = new EventEmitter();

  public startNewDailyMeeting() {
    this.onStart.emit();
  }



}
