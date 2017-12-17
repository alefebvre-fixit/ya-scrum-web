import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Group, SignUp, User, Account } from '../models';
import { UserService } from './user.service';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  private _account: Account;
  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.extractAccount();
  }

  get account(): Account {
    return this._account;
  }

  set account(account: Account) {

    localStorage.setItem('ya-scrum:account', JSON.stringify(account));
    this._account = account;
  }

  private extractAccount() {
    const serializedAccount = localStorage.getItem('ya-scrum:account');
    if (serializedAccount) {
      this._account = JSON.parse(serializedAccount);
    }
  }

  public storeAccount(account: Account): Observable<Account> {
    return Observable.create(observer => {
      this.account = account;

      observer.next(account);
      observer.complete();
    });
  }

  public baseUrl(ressource: string): string {
    return 'groups/' + this.account.group.id + '/' + ressource;
  }


}
