import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './ya.routes';
import { TitleCasePipe } from '@angular/common';

import { YaComponent } from './ya.component';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ya-scrum/material';
import { CovalentLayoutModule } from '@covalent/core';
import { CovalentMediaModule } from '@covalent/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { HomeModule } from './home';
import { UserModule } from './user';
import { StoryModule } from './story';
import { SprintModule } from './sprint';

import { AuthGuard } from './auth.service';

import { StoryService, SprintService, ThemeService, DateService } from '@ya-scrum/services';
import { UserService, GroupService, AuthenticationService, InviteService } from '@ya-scrum/services';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    YaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HomeModule,
    SprintModule,
    StoryModule,
    UserModule,
    RouterModule.forRoot(ROUTES),

  ],
  providers: [
    UserService,
    StoryService,
    SprintService,
    AuthGuard,
    ThemeService,
    DateService,
    GroupService,
    InviteService,
    AuthenticationService,
    TitleCasePipe
  ],
  bootstrap: [YaComponent]
})
export class YaModule { }
