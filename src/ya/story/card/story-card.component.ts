import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { Sprint, Story, User } from '@ya-scrum/models';
import { UserService, SprintService, StoryService } from '@ya-scrum/services';

@Component({
  selector: 'ya-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {

  @Input() story: Story;

  productOwner: User;
  sprint: Sprint;

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
        if (user && user.name) {
          this.productOwner = user;
        }
      });
    } else {
      this.productOwner = undefined;
    }
    if (this.story.sprintId) {
      this.sprintService.findOne(this.story.sprintId).subscribe(sprint => {
        this.sprint = sprint;
      });
    } else {
      this.sprint = undefined;
    }
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return this.storyService.storyProgress(this.story);
  }

}
