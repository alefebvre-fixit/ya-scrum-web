import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { Story, Sprint } from '@ya-scrum/models';
import { StoryService, SprintService, UserService } from '@ya-scrum/services';


@Component({
  templateUrl: './sprint-story-selector.component.html',
  styleUrls: ['./sprint-story-selector.component.scss']
})
export class SprintStorySelectorComponent implements OnInit {

  stories: Story[];
  public sprint: Sprint;

  columns: ITdDataTableColumn[] = [
    { name: 'priority', label: 'priority' },
    { name: 'size', label: 'size' },
    { name: 'name', label: 'name' },
    { name: 'type', label: 'type' },
    { name: 'description', label: 'description' },
  ];

  filteredData: any[] = this.stories;
  searchTerm = '';
  fromRow = 1;
  sortBy = 'priority';
  selectedRows: Story[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private storyService: StoryService,
    private _dataTableService: TdDataTableService,
    public dialogRef: MatDialogRef<SprintStorySelectorComponent>,
  ) {

  }

  ngOnInit(): void {
    this.storyService.findNewStories().subscribe(stories => {
      this.stories = stories;
      this.filter();
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    if (this.stories) {
      let newData: any[] = this.stories;
      const excludedColumns: string[] = this.columns
        .filter((column: ITdDataTableColumn) => {
          return ((column.filter === undefined && column.hidden === true) ||
            (column.filter !== undefined && column.filter === false));
        }).map((column: ITdDataTableColumn) => {
          return column.name;
        });
      newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
      //this.filteredTotal = newData.length;
      newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
      this.filteredData = newData;
    }
  }

  select() {
    this.dialogRef.close(this.selectedRows);
  }

}
