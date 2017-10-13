import { Component, OnInit, Input, Directive} from '@angular/core';

import { Story } from '@ya-scrum/models';


@Directive({
  selector: 'ya-story-grid-title',
})
export class StoryGridTitleDirective {}

@Component({
  selector: 'ya-story-grid',
  templateUrl: './story-grid.component.html',
  styleUrls: ['./story-grid.component.scss']
})
export class StoryGridComponent  {

  @Input() stories: Story[];

  constructor(
  ) {
  }

}
