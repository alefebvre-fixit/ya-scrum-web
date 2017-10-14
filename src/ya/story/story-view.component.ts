import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';
import { SimpleDialogComponent } from '@ya-scrum/shared';

import { StoryEditDialogComponent } from './story-edit.dialog';

@Component({
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss'],
})
export class StoryViewComponent implements OnInit {

  story: Story;
  progress: StoryProgress;
  sprint: Sprint;
  productOwner: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintService: SprintService,
    private storyService: StoryService,
    private userService: UserService,
    private dialog: MatDialog,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.storyService.findOne(id).subscribe(story => {
          this.story = story;
          
          if (story && story.sprintId) {
            this.sprintService.findOne(story.sprintId).subscribe(sprint => {
              this.sprint = sprint;
            });
          } else {
            this.sprint = undefined;
          }
          if (story && story.productOwnerId) {
            this.userService.findOne(story.productOwnerId).subscribe(user => {
              if (user && user.name) {
                this.productOwner = user;
              }
            });
          } else {
            this.productOwner = undefined;
          }
        });
      });
  }

  editStory(story: Story) {

    if (story === undefined){
      return;
    }

    const dialogRef = this.dialog.open(StoryEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        story: this.story,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteStory(story: Story) {

    if (story === undefined){
      return;
    }

    if (story) {
      this._dialogService.openConfirm({

        message: 'Do you want to delete current story?',
        viewContainerRef: this._viewContainerRef,
        title: 'Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'delete',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.storyService.delete(story.id);
          this.router.navigate([`/stories`]);

        } else {
          // DO SOMETHING ELSE
        }
      });
    }
  }

  removeStoryFromSprint(story: Story) {

    if (story === undefined){
      return;
    }

    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '800',
      data: {
        title: 'Remove story from sprint ',
        label: 'Warning!',
        sublabel: 'Progress recorded for this story will be lost',
        validateButton: 'REMOVE',
        cancelButton: 'CANCEL',
        
      }
    });

    dialogRef.afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.storyService.removeStoryFromSprint(story);
      }
    });


    // if (this.sprint) {
    //   this._dialogService.openConfirm({

    //     message: 'This will un-assign current story from sprint ' + this.sprint.name + ' Do you confirm?',
    //     viewContainerRef: this._viewContainerRef,
    //     title: 'Confirm',
    //     cancelButton: 'Cancel',
    //     acceptButton: 'Unassign',
    //   }).afterClosed().subscribe((accept: boolean) => {
    //     if (accept) {
    //       this.storyService.unassignStory(story);

    //     } else {
    //       // DO SOMETHING ELSE
    //     }
    //   });
    // }

  }

}
