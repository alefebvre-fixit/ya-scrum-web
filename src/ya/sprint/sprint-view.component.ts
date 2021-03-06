import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Sprint, SprintFactory, SprintProgress, Story, User } from '@ya-scrum/models';
import { ImpedimentService, SprintService, StoryService, UserService } from '@ya-scrum/services';

import { StorySelectorDialogComponent } from '../story';
import { SprintBackgroundDialogComponent } from './sprint-background.dialog';
import { SprintEditDialogComponent } from './sprint-edit.dialog';
import { SprintStorySelectorComponent } from './story/sprint-story-selector.component';

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
    private impedimentService: ImpedimentService,
    private storyService: StoryService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    const snackBarRef = this.snackBar.open('Daily Meeting Open', 'OK', {
      duration: 3000
    });
  }

  public closeDailyMeeting() {
    this.sprintService.closedDailyMeeting(this.sprint, this.stories);
    const snackBarRef = this.snackBar.open('Daily Meeting Closed', 'OK', {
      duration: 3000
    });

  }

  public cancelLastDailyMeeting() {
    this.sprintService.cancelLastDailyMeeting(this.sprint, this.stories);
    const snackBarRef = this.snackBar.open('Daily Meeting Canceled', 'OK', {
      duration: 3000
    });

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

  addImpediment() {
    if (!this.sprint.impediment) {
      this.impedimentService.createImpediment(this.sprint);
    }
  }

  removeImpediment() {
    if (this.sprint.impediment) {
      this.impedimentService.removeImpediment(this.sprint);
    }
  }





}
