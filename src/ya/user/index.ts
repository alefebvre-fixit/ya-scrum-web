import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ya-scrum/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list.component';
import { UserPageComponent } from './user-page.component';
import { UserAccountComponent } from './user-account.component';

import { SignInPageComponent } from './signin/sign-in-page.component';
import { SignUpPageComponent } from './signup/sign-up-page.component';
import { CreateGroupPageComponent } from './group/create-group-page.component';
import { SharedModule } from '../shared';
import { InviteModule } from './invite';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InviteModule
  ],
  declarations: [
    UserListComponent,
    UserAccountComponent,
    SignInPageComponent,
    SignUpPageComponent,
    CreateGroupPageComponent,
    UserPageComponent
  ],
  exports: [
    UserListComponent,
    UserAccountComponent,
    UserPageComponent
  ],
  entryComponents: [],
  providers: [
  ]
})

export class UserModule { }

export { UserAccountComponent } from './user-account.component';
export { SignInPageComponent } from './signin/sign-in-page.component';
export { SignUpPageComponent } from './signup/sign-up-page.component';
export { CreateGroupPageComponent } from './group/create-group-page.component';
export { InvitePageComponent } from './invite';
export { UserPageComponent } from './user-page.component';


