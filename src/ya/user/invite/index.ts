import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentMessageModule } from '@covalent/core';

import { InvitePageComponent } from './invite-page.component';
import { InviteListComponent } from './invite-list.component';
import { SharedModule } from '../../shared';
import { EditInviteDialogComponent } from './edit-invite-dialog';

import { PipeModule } from '@ya-scrum/pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule,
    CovalentMessageModule
  ],
  declarations: [
    InviteListComponent,
    EditInviteDialogComponent,
    InvitePageComponent
  ],
  exports: [
    InviteListComponent,
    InvitePageComponent
  ],
  entryComponents: [
    EditInviteDialogComponent
  ],
  providers: [

  ]
})

export class InviteModule { }

export { InvitePageComponent } from './invite-page.component';


