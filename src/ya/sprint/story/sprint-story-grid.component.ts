import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Story, Sprint, SprintStatus } from '@ya-scrum/models';

@Component({
  selector: 'ya-sprint-story-grid',
  templateUrl: './sprint-story-grid.component.html',
  styleUrls: ['./sprint-story-grid.component.scss']
})
export class SprintStoryGridComponent {

  @Input() stories: Story[];
  @Input() status: string = SprintStatus.CLOSED;

  constructor(
  ) {
  }

  trackStory(index, story: Story) {
    return story ? story.id : undefined;
  }

}
