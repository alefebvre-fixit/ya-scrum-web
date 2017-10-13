import { Component, OnInit, Input, Directive } from '@angular/core';


@Directive({
  selector: 'ya-section-title-highlight',
})
export class SectionTitleHighlight { }


@Directive({
  selector: 'ya-section-button-bar',
})
export class SectionButtonBar { }


@Component({
  selector: 'ya-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent {

  constructor(
  ) {
  }

}
