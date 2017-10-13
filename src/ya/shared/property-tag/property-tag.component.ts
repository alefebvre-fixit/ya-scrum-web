import { Component, OnInit, Input, OnChanges, } from '@angular/core';
import { ThemeService } from '@ya-scrum/services';
import { Theme } from '@ya-scrum/models';

@Component({
  selector: 'ya-property-tag',
  templateUrl: './property-tag.component.html',
  styleUrls: ['./property-tag.component.scss'],
})
export class PropertyTagComponent {

  @Input() color: string;

  get textColor(): string {
    if (this.color) {
      return this.color;
    } else {
      return '#03a9f4';
    }
  }

}
