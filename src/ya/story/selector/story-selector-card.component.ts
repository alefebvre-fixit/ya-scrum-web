import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { Sprint, Story, User } from '@ya-scrum/models';
import { UserService, SprintService, StoryService } from '@ya-scrum/services';

@Component({
  selector: 'ya-story-selector-card',
  templateUrl: './story-selector-card.component.html',
  styleUrls: ['./story-selector-card.component.scss'],
})
export class StorySelectorCardComponent implements OnInit {

  @Input() story: Story;
  @Input() sprint: Sprint;

  productOwner: User;

  constructor(
    private router: Router,
    private sprintService: SprintService,
    private storyService: StoryService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    if (this.story.productOwnerId) {
      this.userService.findOne(this.story.productOwnerId).subscribe(user => {
        if (user.name) {
          this.productOwner = user;
        }
      });
    } else {
      this.productOwner = undefined;
    }
  }

  public select() {
    if (this.story.sprintId) {
      delete (this.story.sprintId);
    } else {
      this.story.sprintId = this.sprint.id;
    }
  }

  public progressAsPercentage(): number {
    return this.storyService.storyProgress(this.story);
  }

}
