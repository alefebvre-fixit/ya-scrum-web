import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress, Upload, User, Invite, InviteFactory } from '../models';
import { UserService } from './user.service';
import { DateService } from './date.service';
import { AuthenticationService } from './authentication.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference  } from 'firebase/firestore';


@Injectable()
export class InviteService {

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private authentication: AuthenticationService,
  ) {
  }

  private inviteCollection(): AngularFirestoreCollection<Invite> {
    return this.afs.collection(this.inviteUrl());    
  }

  private baseUrl(ressource: string): string {
    return this.authentication.baseUrl(ressource);
  }

  private inviteUrl() {
    return this.authentication.baseUrl('invites/');
  }

  public save(invite: Invite): Observable<void> {
    if (invite.id) {
      return this.update(invite);
    } else {
      return this.create(invite);
    }
  }

  private create(invite: Invite): Observable<void> {
    invite.id = this.afs.createId();
    return Observable.fromPromise(this.inviteCollection().doc(invite.id).set(invite));
  }

  private update(invite: Invite): Observable<void> {
    return Observable.fromPromise(this.inviteCollection().doc(invite.id).update(invite));
  }

  public findAll(): Observable<Invite[]> {
    return this.inviteCollection().valueChanges();
  }

  public findOne(id: string): Observable<Invite> {
    return this.afs.doc<Invite>(this.inviteUrl() + id).valueChanges();
  }

  public findByEmail(email: string): Observable<Invite[]> {
    return this.afs.collection<Invite>(this.inviteUrl(), ref => ref.where('email', '==', email)).valueChanges();
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Invite>(this.inviteUrl() + id).delete());
  }

  public buildUrl(invite: Invite) {
    return 'http://localhost:4200/invites/' + invite.id;
  }

  public instanciate(): Invite {
    const result = InviteFactory.create();

    const now = new Date();
    result.date = now.toISOString();
    result.groupId = this.authentication.account.group.id;

    return result;
  }













}
