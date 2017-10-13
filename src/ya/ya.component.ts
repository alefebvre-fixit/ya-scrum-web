import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '@ya-scrum/services';
import { Account } from '@ya-scrum/models';

@Component({
  selector: 'ya-root',
  templateUrl: './ya.component.html',
  styleUrls: ['./ya.component.scss'],
})
export class YaComponent {

  user: Observable<firebase.User>;
  account: Account;

  constructor(
    public afAuth: AngularFireAuth,
    private authentication: AuthenticationService,
    private router: Router
  ) {
    this.user = afAuth.authState;
    this.account = authentication.account;
  }

  signOut() {
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate([`/sign-in`]);
      }
    );
  }

}




