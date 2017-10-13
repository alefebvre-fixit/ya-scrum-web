import { Component, OnInit, Input } from '@angular/core';

import { Story } from '@ya-scrum/models';
import { StoryService } from '@ya-scrum/services';

@Component({
  selector: 'ya-story-status',
  templateUrl: './story-status.component.html',
  styleUrls: ['./story-status.component.scss'],
})
export class StoryStatusComponent implements OnInit {

  @Input() story: Story;

  constructor(
    private storyService: StoryService,    
  ) {
  }

  ngOnInit() {
  }

  public progressAsPercentage(): number {
    return this.storyService.storyProgress(this.story);
  }

}
