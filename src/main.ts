import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { YaModule } from './ya';
import { environment } from './environments/environment';
import 'c3/c3';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(YaModule);
