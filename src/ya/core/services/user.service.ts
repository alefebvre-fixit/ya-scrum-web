import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User, UserFactory, Account, AccountFactory, Group, SignIn, SignUp } from '../models';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference } from 'firebase/firestore';


@Injectable()
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private authentication: AuthenticationService,
    private afAuth: AngularFireAuth,
  ) {
  }
  
  private userCollection(): AngularFirestoreCollection<User> {
    return this.afs.collection(this.usersUrl());    
  }

  private accountCollection(): AngularFirestoreCollection<Account> {
    return this.afs.collection(this.accountUrl());    
  }

  private roles = [
    "Product Manager",
    "Developer",
    "QA",
    "Business Analyst",
  ];

  private teams = [
    "Collateral",
    "Security-Finance"
  ];

  private usersUrl(): string {
    return this.authentication.baseUrl('users/');
  }

  private accountUrl(): string {
    return 'accounts/';
  }

  public getUserRoles(): Array<string> {
    return this.roles;
  }

  public getTeams(): Array<string> {
    return this.teams;
  }

  public instanciate(fbUser: firebase.User): User {

    const result = UserFactory.create();

    result.id = fbUser.uid;
    result.email = fbUser.email;
    result.name = fbUser.displayName;

    return result;
  }

  public findAll(): Observable<User[]> {
    return this.afs.collection<User>(this.usersUrl()).valueChanges();
  }

  public findOne(id: string): Observable<User> {
    return this.afs.doc<User>(this.usersUrl() + id).valueChanges();
  }

  public save(user: User): Observable<void> {
    if (user.id) {
      return this.update(user);
    } else {
      return this.create(user);
    }
  }

  public create(user: User): Observable<void> {
    if (user.id ===  undefined){
      user.id = this.afs.createId();
    }
    return Observable.fromPromise(this.userCollection().doc(user.id).set(user));
  }

  private update(user: User): Observable<void> {
    return Observable.fromPromise(this.userCollection().doc(user.id).update(user));
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<User>(this.usersUrl() + id).delete());
  }

  public filterUsers(searchTerm: string, users: User[]) {
    if (users) {
      if (this.isEmpty(searchTerm) || this.isBlank(searchTerm)) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  private isEmpty(str) {
    return (!str || 0 === str.length);
  }

  private isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
  }

  public emailSignIn(signin: SignIn): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(signin.email, signin.password))
      .flatMap((fbUser: any) => this.findOneAccount(fbUser ? fbUser.uid : undefined))
      .flatMap((account: Account) => this.authentication.storeAccount(account));
    ;
  }

  public googleSignIn(): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  public currentFirebaseUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  public findCurrentAccount(): Observable<Account> {
    return this.afAuth.authState.flatMap(fbUser => this.findOneAccount(fbUser ? fbUser.uid : undefined));
  }

  public findOneAccount(id: string): Observable<Account> {
    return this.afs.doc<Account>(this.accountUrl() + id).valueChanges();
  }

  public saveAccount(account: Account): Observable<void> {
    if (account.id) {
      return this.updateAccount(account);
    } else {
      return this.createAccount(account);
    }
  }

  public createAccount(account: Account): Observable<void> {
    if (account.id === undefined){
      account.id = this.afs.createId();    
    }
    return Observable.fromPromise(this.accountCollection().doc(account.id).set(account));
  }

  private updateAccount(account: Account): Observable<void> {
    return Observable.fromPromise(this.accountCollection().doc(account.id).update(account));
  }

  public deleteAccount(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Account>(this.accountUrl() + id).delete());
  }

  public instanciateAccount(user: User, group: Group): Account {
    return AccountFactory.create(user, group);
  }


}
