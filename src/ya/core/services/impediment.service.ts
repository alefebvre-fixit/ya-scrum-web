import { YaService } from './ya.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

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

  public getMeeting(impediment: Impediment, day: number): Meeting {

    if (impediment && impediment.meetings) {
      for (const meeting of impediment.meetings) {
        if (meeting && meeting.day === day) {
          return meeting;
        }
      }
    }

    return undefined;
  }

  public getLatestMeeting(impediment: Impediment): Meeting {

    let result: Meeting;

    if (impediment && impediment.meetings) {
      result = this.getMeeting(impediment, impediment.meetings.length);
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


  public initDailyMeeting(impediment: Impediment, day: number) {

    const result = SprintFactory.createImpedimentMeeting();

    result.day = day;
    result.date = new Date();

    const previous = this.getMeeting(impediment, day - 1);
    if (previous) {
      result.previous = previous.previous + previous.daily;
      result.total = previous.previous + previous.daily;
      result.daily = 0;
    } else {
      result.previous = 0;
      result.daily = 0;
      result.total = 0;
    }

    //this.setMeeting(story, result);

  }


}
