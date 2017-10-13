import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User, Upload } from '@ya-scrum/models';
import { SprintEditDialogComponent } from './sprint-edit.dialog';
import { SprintStorySelectorComponent } from './story/sprint-story-selector.component';
import { StorySelectorDialogComponent } from '../story';



import { SprintBackgroundDialogComponent } from './sprint-background.dialog';

@Component({
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.scss'],
  providers: [],
})
export class SprintViewComponent implements OnInit {

  public sprint: Sprint;
  public stories: Story[];
  public scrummaster: User;
  public progress: SprintProgress;
  public progressHistory: SprintProgress[];

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    private storyService: StoryService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.sprintService.findOne(id).subscribe(sprint => {
          this.sprint = sprint;

          this.storyService.findBySprintId(sprint.id).subscribe(stories => {
            this.stories = stories;
            this.progressHistory = this.sprintService.getSprintProgressHistory(this.sprint, this.stories);
            //this.sprintService.updateProgress(this.sprint, this.stories);
          });

          if (this.sprint.scrumMasterId) {
            this.userService.findOne(this.sprint.scrumMasterId).subscribe(user => this.scrummaster = user);
          }

        });
      });
  }

  public progressAsPercentage(): number {
    return SprintService.progressAsPercentage(this.sprint);
  }

  public startNewDailyMeeting() {
    this.sprintService.startNewDailyMeeting(this.sprint, this.stories);
  }

  public closeDailyMeeting() {
    this.sprintService.closedDailyMeeting(this.sprint, this.stories);
  }

  public cancelLastDailyMeeting() {
    this.sprintService.cancelLastDailyMeeting(this.sprint, this.stories);
  }

  editSprint(sprint: Sprint) {
    const dialogRef = this.dialog.open(SprintEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        sprint: this.sprint,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });
  }

  selectStories(stories: Story[]) {
    this.sprintService.assigStoriesToSprint(this.sprint, stories);
  }

  addStoryOld() {
    const dialogRef = this.dialog.open(SprintStorySelectorComponent, { width: '1024px' });
    dialogRef.componentInstance.sprint = this.sprint;
    dialogRef.afterClosed().subscribe((stories: Story[]) => {
      if (stories && stories.length > 0) {
        this.sprintService.assigStoriesToSprint(this.sprint, stories);
      }
    });
  }

  addStory() {
    const dialogRef = this.dialog.open(StorySelectorDialogComponent, {
      panelClass: 'story-selector-dialog',
      data: {
        sprint: this.sprint,
      }
    });
    dialogRef.afterClosed().subscribe((stories: Story[]) => {
      if (stories && stories.length > 0) {
        this.sprintService.assigStoriesToSprint(this.sprint, stories);
      }
    });
  }

  uploadBackground(event) {
    if (event.target.files) {
      const file = event.target.files.item(0);
      const dialogRef = this.dialog.open(SprintBackgroundDialogComponent, {
        panelClass: 'sprint-background-dialog',
        data: {
          image: file,
          sprint: this.sprint,
        }
      });
    }
  }





}
