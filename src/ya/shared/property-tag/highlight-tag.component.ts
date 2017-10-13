import { Component, OnInit, Input, OnChanges, } from '@angular/core';
import { ThemeService } from '@ya-scrum/services';
import { Theme } from '@ya-scrum/models';

@Component({
  selector: 'ya-highlight-tag',
  templateUrl: './highlight-tag.component.html',
  styleUrls: ['./highlight-tag.component.scss'],
})
export class HighlightTagComponent implements OnInit {

  @Input() theme: string;
  private _theme: Theme;

  constructor(private themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this._theme = this.themeService.findTheme(this.theme);
  }

  get textColor(): string {
    if (this._theme) {
      return this._theme.$primary_color_text;
    } else {
      return '#03a9f4';
    }
  }

  get color(): string {
    if (this._theme) {
      return this._theme.$primary_color;
    } else {
      return '#03a9f4';
    }
  }

}
