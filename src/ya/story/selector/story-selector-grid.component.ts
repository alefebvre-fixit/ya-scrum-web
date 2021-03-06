import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Story, Sprint } from '@ya-scrum/models';
import { SprintService } from '@ya-scrum/services';

@Component({
  selector: 'ya-story-selector-grid',
  templateUrl: './story-selector-grid.component.html',
  styleUrls: ['./story-selector-grid.component.scss']
})
export class StorySelectorGridComponent {

  @Input() stories: Story[];
  @Input() sprint: Sprint[];

  constructor(
    private sprintService: SprintService,
  ) {
  }

  trackStory(index, story: Story) {
    return story ? story.id : undefined;
  }

}
