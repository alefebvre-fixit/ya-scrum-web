import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { TdDataTableService } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { Story, Sprint } from '@ya-scrum/models';
import { StoryService, SprintService, UserService } from '@ya-scrum/services';


@Component({
  templateUrl: './story-selector.dialog.html',
  styleUrls: ['./story-selector.dialog.scss']
})
export class StorySelectorDialogComponent implements OnInit {

  stories: Story[];
  sprint: Sprint;

  filteredData: any[] = this.stories;
  searchTerm = '';

  constructor(
    private storyService: StoryService,
    private _dataTableService: TdDataTableService,
    public dialogRef: MatDialogRef<StorySelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.sprint = data.sprint;
    }
  }

  ngOnInit(): void {
    this.storyService.findNewStories().subscribe(stories => {
      this.stories = stories;
      this.filter();
    });
  }

  selectStories(): void {
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    if (this.stories) {
      let newData: any[] = this.stories;
      newData = this._dataTableService.filterData(newData, this.searchTerm, true);
      this.filteredData = newData;
    }
  }

  select() {
    this.dialogRef.close(this.selectedStory());
  }

  public selectedStory(): Story[] {
    if (this.stories) {
      return this.stories.filter(story => story.sprintId === this.sprint.id);
    }
    return [];
  }

}
