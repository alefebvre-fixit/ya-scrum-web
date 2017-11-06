import { Component, Input, OnInit } from '@angular/core';
import { Sprint, SprintFactory } from '@ya-scrum/models';

@Component({
  selector: 'ya-impediment-selector-card',
  templateUrl: './impediment-selector-card.component.html',
  styleUrls: ['./story-selector-card.component.scss'],
})
export class ImpedimentSelectorCardComponent implements OnInit {

  @Input() sprint: Sprint;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  public selected(): boolean {
    return this.sprint.impediment !== undefined;
  }

  public select() {

    if (this.sprint.impediment) {
      this.sprint.impediment = undefined;
    } else {
      this.sprint.impediment = SprintFactory.createImpediment();
    }
  }

}
