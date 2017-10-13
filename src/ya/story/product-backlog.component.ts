import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { StoryService } from '@ya-scrum/services';
import { Story } from '@ya-scrum/models';
import { StoryEditDialogComponent } from './story-edit.dialog';

@Component({
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent implements OnInit {

  public storiesPending: Story[];
  public storiesClosed: Story[];
  public storiesInProgress: Story[];

  constructor(
    private router: Router,
    private storyService: StoryService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.storyService.findByStatus('progress').subscribe((stories: Story[]) => {
      this.storiesInProgress = this.storyService.sortByPriority(stories);
    });

    this.storyService.findByStatus('pending').subscribe((stories: Story[]) => {
      this.storiesPending = this.storyService.sortByPriority(stories);
    });

    this.storyService.findByStatus('closed').subscribe((stories: Story[]) => {
      this.storiesClosed = this.storyService.sortByPriority(stories);
    });

  }

  addStory(): void {
    const dialogRef = this.dialog.open(StoryEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        story: this.storyService.instanciate(),
      }
    });
    dialogRef.afterClosed().subscribe(story => {
      if (story && story.id) {
        this.router.navigate([`/stories/${story.id}`]);
      }
    });
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

}
