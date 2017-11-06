import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
    ITdDataTableColumn,
    ITdDataTableSortChangeEvent,
    TdDataTableService,
    TdDataTableSortingOrder,
} from '@covalent/core';
import { Story } from '@ya-scrum/models';

@Component({
  selector: 'ya-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnChanges, OnInit {

  @Input() stories: Story[] = [];
  @Output() onStorySelected: EventEmitter<any> = new EventEmitter();

  columns: ITdDataTableColumn[] = [
    { name: 'priority', label: 'priority' },
    { name: 'size', label: 'size' },
    { name: 'name', label: 'name' },
    { name: 'type', label: 'type' },
    { name: 'description', label: 'description' },
  ];

  filteredData: any[] = this.stories;
  searchTerm: string = '';
  fromRow: number = 1;
  sortBy: string = 'priority';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService) {
  }

  ngOnInit(): void {
    this.filter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filter();
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

  add() {
    this.onStorySelected.emit(this.selectedRows);
  }

}
