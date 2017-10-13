import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Group, GroupFactory, SignUp, User, Account, Invite } from '@ya-scrum/models';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference } from 'firebase/firestore';

@Injectable()
export class GroupService {

  public _signup: SignUp;

  constructor(
    private afs: AngularFirestore,
    private authentication: AuthenticationService,
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) {
  }

  private groupCollection(): AngularFirestoreCollection<Group> {
    return this.afs.collection(this.groupsUrl());    
  }

  private groupsUrl(): string {
    return 'groups/';
  }

  public instanciateGroup(): Group {
    return GroupFactory.create();
  }

  public findAll(): Observable<Group[]> {
    return this.afs.collection<Group>(this.groupsUrl()).valueChanges();
  }

  public findOne(id: string): Observable<Group> {
    return this.afs.doc<Group>(this.groupsUrl() + id).valueChanges();
  }

  public save(group: Group): Observable<void> {
    if (group.id) {
      return this.update(group);
    } else {
      return this.create(group);
    }
  }

  private create(group: Group): Observable<void> {
    group.id = this.afs.createId();
    return Observable.fromPromise(this.groupCollection().doc(group.id).set(group));
  }

  private update(group: Group): Observable<void> {
    return Observable.fromPromise(this.groupCollection().doc(group.id).update(group));
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Group>(this.groupsUrl() + id).delete());
  }

  public registerSignUp(signup: SignUp) {
    this._signup = signup;
  }

  public signUp(signUp: SignUp): Observable<any> {

    if (signUp.invite && !signUp.group) {
      console.log();
      return;
    }


    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserWithEmailAndPassword(signUp.email, signUp.password))
      .map(result =>
        this.afAuth.auth.currentUser.updateProfile({
          displayName: signUp.name,
          photoURL: undefined,
        }).then(() => {

          if (signUp.group && !signUp.group.id) {
            this.create(signUp.group).subscribe(
              () => { 
                //signUp.group.id = ref.id;

                const user = this.userService.instanciate(this.afAuth.auth.currentUser);
                const account = this.userService.instanciateAccount(user, signUp.group);
      
                this.authentication.storeAccount(account).subscribe(() => {
                  console.log(account)
                  this.userService.createAccount(account);
                  console.log(user)
                  this.userService.create(user);
                });
              
              }
            );
          } else {

            //remove code duplication
            const user = this.userService.instanciate(this.afAuth.auth.currentUser);
            const account = this.userService.instanciateAccount(user, signUp.group);
  
            this.authentication.storeAccount(account).subscribe(() => {
              this.userService.saveAccount(account);
              this.userService.save(user);
            });

          }

          if (signUp.invite && !signUp.invite.id) {
            return Observable.fromPromise(this.afs.doc<Invite>('/groups/' + signUp.invite.groupId + '/' + signUp.invite.id).delete());
          }


        })
      );
  }


}
