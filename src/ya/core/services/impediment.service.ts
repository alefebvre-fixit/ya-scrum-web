import { YaService } from './ya.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Sprint, Impediment, Meeting, SprintFactory } from '../models';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class ImpedimentService extends YaService {

  constructor(
    private afs: AngularFirestore,
    private authentication: AuthenticationService,
  ) {
    super(afs, authentication);
  }

  public getMeeting(sprint: Sprint, day: number): Meeting {

    if (sprint.impediment && sprint.impediment.meetings) {
      for (const meeting of sprint.impediment.meetings) {
        if (meeting && meeting.day === day) {
          return meeting;
        }
      }
    }

    return undefined;
  }

  public getLatestMeeting(sprint: Sprint): Meeting {

    let result: Meeting;

    if (sprint.impediment && sprint.impediment.meetings) {
      result = this.getMeeting(sprint, sprint.impediment.meetings.length);
    }

    return result;
  }


  public setTimeSpent(sprint: Sprint, meeting: Meeting, daily: number): Meeting {

    const impediment = sprint.impediment;

    const result: Meeting = Object.assign({}, meeting);

    result.total = result.previous;

    result.daily = daily;
    result.total = result.previous + result.daily;


    if (!impediment.meetings) {
      impediment.meetings = [];
    }

    impediment.meetings[meeting.day - 1] = meeting;

    this.sprintCollection().doc(sprint.id).update({
      impediment: sprint.impediment
    });

    return result;
  }

  public incrementTimeSpent(sprint: Sprint, meeting: Meeting, increment: number): Meeting {
    return this.setTimeSpent(sprint, meeting, meeting.daily + increment);
  }


  public createImpediment(sprint: Sprint) {

    if (!sprint.impediment) {
      this.sprintCollection().doc(sprint.id).update({
        impediment: SprintFactory.createImpediment()
      });
    }

  }

  public removeImpediment(sprint: Sprint) {
    if (sprint.impediment) {
      this.sprintCollection().doc(sprint.id).update({
        impediment: firebase.firestore.FieldValue.delete()
      });
    }
  }


  public startMeeting(sprint: Sprint, day: number) {

    const result = SprintFactory.createMeeting();

    result.day = day;
    result.date = new Date();

    const previous = this.getMeeting(sprint, day - 1);
    if (previous) {
      result.previous = previous.previous + previous.daily;
      result.total = previous.previous + previous.daily;
      result.daily = 0;
    } else {
      result.previous = 0;
      result.daily = 0;
      result.total = 0;
    }

    this.setMeeting(sprint, result);

  }

  private setMeeting(sprint: Sprint, meeting: Meeting) {

    if (sprint.impediment === undefined) {
      return;
    }

    if (sprint.impediment.meetings === undefined) {
      sprint.impediment.meetings = new Array<Meeting>();
    }

    if (meeting.day > 0) {
      sprint.impediment.meetings[meeting.day - 1] = meeting;
    }

  }



}
