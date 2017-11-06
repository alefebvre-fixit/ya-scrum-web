import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { StorySelectorGridComponent } from './story-selector-grid.component';
import { StorySelectorDialogComponent } from './story-selector.dialog';
import { StorySelectorCardComponent } from './story-selector-card.component';
import { ImpedimentSelectorCardComponent } from './impediment-selector-card.component';

import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared';
import { StoryCardModule } from '../card';
import { PipeModule } from '@ya-scrum/pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentCommonModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentDialogsModule,
    CovalentMessageModule,
    SharedModule,
    StoryCardModule,
    PipeModule
  ],
  declarations: [
    StorySelectorGridComponent,
    StorySelectorDialogComponent,
    StorySelectorCardComponent,
    ImpedimentSelectorCardComponent
  ],
  exports: [
    StorySelectorGridComponent,
    StorySelectorDialogComponent,
    ImpedimentSelectorCardComponent
  ],
  providers: [
  ],
  entryComponents: [
    StorySelectorDialogComponent
  ],
})

export class StorySelectorModule { }

export { StorySelectorDialogComponent } from './story-selector.dialog';