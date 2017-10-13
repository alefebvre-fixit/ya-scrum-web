import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Theme } from '../models';

@Injectable()
export class ThemeService {

  private cyan = new Theme(
    '#0097A7',
    '#00BCD4',
    '#B2EBF2',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private teal = new Theme(
    '#00796B',
    '#009688',
    '#B2DFDB',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private pink = new Theme(
    '#C2185B',
    '#E91E63',
    '#F8BBD0',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private purple = new Theme(
    '#7B1FA2',
    '#9C27B0',
    '#E1BEE7',
    '#FFFFFF',
    '#607D8B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private lightBlue = new Theme(
    '#0288D1',
    '#03A9F4',
    '#B3E5FC',
    '#FFFFFF',
    '#FFEB3B',
    '#212121',
    '#757575',
    '#BDBDBD',
  );

  private themes = {
    'cyan': this.cyan,
    'teal': this.teal,
    'pink': this.pink,
    'purple': this.purple,
    'light-blue': this.lightBlue,
    'default': this.teal,
  };

  public findTheme(name: string): Theme {

    const result = this.themes[name];

    if (result) {
      return result;
    } else {
      return this.themes['default'];
    }

  }

  public findAllThemeNames(): string[] {
    return ['cyan', 'teal', 'pink', 'purple', 'light-blue'];
  }

}
