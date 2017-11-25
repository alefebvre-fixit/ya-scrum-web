import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, SprintFactory, Story, StoryProgress, SprintProgress, Upload, User } from '../models';
import { UserService } from './user.service';
import { DateService } from './date.service';

import { AuthenticationService } from './authentication.service';

import { FirebaseApp } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference } from 'firebase/firestore';
import * as firebase from 'firebase';
import { SprintStatus, SprintFilter } from 'ya/core/models/sprint';

import { StoryService } from './story.service';
import { ImpedimentService } from './impediment.service';
import { StoryStatus } from 'ya/core/models/story';

@Injectable()
export class SprintService {

  constructor(
    private afs: AngularFirestore,
    private firebaseApp: FirebaseApp,
    private userService: UserService,
    private storyService: StoryService,
    private impedimentService: ImpedimentService,
    private dateService: DateService,
    private authentication: AuthenticationService,
  ) {
  }

  private sprintCollection(): AngularFirestoreCollection<Sprint> {
    return this.afs.collection(this.sprintsUrl());
  }

  private storyCollection(): AngularFirestoreCollection<Story> {
    return this.afs.collection(this.storiesUrl());
  }

  private baseUrl(ressource: string): string {
    return this.authentication.baseUrl(ressource);
  }

  private sprintsUrl() {
    return this.authentication.baseUrl('sprints/');
  }

  private storiesUrl() {
    return this.authentication.baseUrl('stories/');
  }

  public instanciate(): Sprint {
    const result = SprintFactory.create();

    const now = new Date();
    result.scrumMasterId = this.userService.currentFirebaseUser().uid;
    result.startDate = now.toISOString();
    result.endDate = this.dateService.businessDaysFromDate(now, result.duration).toISOString();

    return result;
  }

  public findAll(): Observable<Sprint[]> {
    return this.afs.collection<Sprint>(this.sprintsUrl(), ref => ref.orderBy('startDate')).valueChanges();
  }

  public findStoryBySprintId(sprintId: string): Observable<Story[]> {
    return this.afs.collection<Story>(this.storiesUrl(), ref => ref.where('sprintId', '==', sprintId)).valueChanges();
  }

  public updateProgress(sprint: Sprint, stories: Story[]) {

    let sprintProgress = 0;

    stories.forEach(story => {
      const latest = this.storyService.getLatestProgress(story);
      if (latest) {
        sprintProgress += latest.total;
      }
    });

    if (sprintProgress !== sprint.progress) {
      sprint.progress = sprintProgress;

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.estimate) {
          sprint.status = SprintStatus.CLOSED;
        } else {
          sprint.status = SprintStatus.STARTED;
        }
      } else {
        sprint.status = SprintStatus.NEW;
      }

      //TODO Update filter
      this.sprintCollection().doc(sprint.id).update({ status: sprint.status, progress: sprint.progress });
    }

  }

  public findOneStory(id: string): Observable<Story> {
    return this.afs.doc<Story>(this.storiesUrl() + id).valueChanges();
  }

  public findByStatus(status: string): Observable<Sprint[]> {
    return this.afs.collection<Sprint>(this.sprintsUrl(), ref => ref.where('filter_status', '==', status)).valueChanges();
  }

  public assigStoriesToSprint(sprint: Sprint, stories: Story[]) {
    for (const story of stories) {
      this.assignStoryToToSprint(sprint, story);
    }
  }

  public assignStoryToToSprint(sprint: Sprint, story: Story) {

    story.history = [];
    if (sprint.meeting.day > 0) {
      for (let index = 1; index <= sprint.meeting.day; index++) {
        this.storyService.initDailyMeeting(story, index);
      }
    }

    if (sprint.estimate === undefined) {
      sprint.estimate = story.estimate;
    } else {
      sprint.estimate += story.estimate;
    }

    sprint.storyNumber = sprint.storyNumber + 1;

    this.storyCollection().doc(story.id).update({
      sprintId: sprint.id,
      status: StoryStatus.ASSIGNED,
      filter_status: this.storyService.getFilterStatus(StoryStatus.ASSIGNED),
      progress: 0,
      duration: sprint.duration,
      history: story.history,
    });

    this.sprintCollection().doc(sprint.id).update({ estimate: sprint.estimate, storyNumber: sprint.storyNumber });

  }

  public cancelLastDailyMeeting(sprint: Sprint, stories: Story[]) {
    if (stories) {

      for (const story of stories) {
        this.storyService.cancelLastMeeting(story);
        this.storyCollection().doc(story.id).update({
          history: story.history
        });
      }

      if (sprint.meeting.day > 0) {
        sprint.meeting.day--;
      } else {
        sprint.meeting.day = 0;
      }
      sprint.meeting.status = SprintStatus.CLOSED;

      this.updateProgress(sprint, stories);
      this.sprintCollection().doc(sprint.id).update({
        meeting: sprint.meeting,
        progress: sprint.progress,
        remaining: sprint.remaining,
        estimate: sprint.estimate
      });
    }
  }

  public closedDailyMeeting(sprint: Sprint, stories: Story[]) {
    sprint.status = SprintStatus.STARTED;
    sprint.meeting.status = SprintStatus.CLOSED;

    if (sprint.meeting.day === sprint.duration) {
      sprint.status = SprintStatus.CLOSED;
    }
    sprint.filter_status = this.getFilterStatus(sprint.status);

    this.sprintCollection().doc(sprint.id).update({
      meeting: sprint.meeting,
      status: sprint.status,
      filter_status: sprint.filter_status
    });
  }

  public startNewDailyMeeting(sprint: Sprint, stories: Story[]) {

    if (!sprint.meeting.day) {
      sprint.meeting.day = 1;
    } else {
      sprint.meeting.day++;
    }
    sprint.status = SprintStatus.STARTED;
    sprint.meeting.status = SprintStatus.OPEN;
    sprint.filter_status = this.getFilterStatus(sprint.status);


    if (sprint.impediment) {
      const meeting = this.impedimentService.getMeeting(sprint.impediment, sprint.meeting.day);
      if (!meeting) {
        this.impedimentService.startMeeting(sprint, sprint.meeting.day);
      }
    }

    if (stories) {

      for (const story of stories) {

        const progress = this.storyService.getProgress(story, sprint.meeting.day);
        if (!progress) {
          this.storyService.initDailyMeeting(story, sprint.meeting.day);
          this.storyCollection().doc(story.id).update({
            history: story.history
          });
        }

      }

      let updates = {
        meeting: sprint.meeting,
        status: sprint.status,
        filter_status: sprint.filter_status,
        impediment: sprint.impediment
      }
      if (sprint.impediment){
        updates.impediment = sprint.impediment;
      }

      this.sprintCollection().doc(sprint.id).update(updates);
    }
  }

  public findOne(id: string): Observable<Sprint> {
    return this.afs.doc<Sprint>(this.sprintsUrl() + id).valueChanges();
  }

  public save(sprint: Sprint): Observable<void> {
    if (sprint.id) {
      return this.update(sprint);
    } else {
      return this.create(sprint);
    }
  }

  private create(sprint: Sprint): Observable<void> {
    sprint.id = this.afs.createId();
    sprint.filter_status = this.getFilterStatus(sprint.status);
    return Observable.fromPromise(this.sprintCollection().doc(sprint.id).set(sprint));
  }

  private update(sprint: Sprint): Observable<void> {
    sprint.filter_status = this.getFilterStatus(sprint.status);
    return Observable.fromPromise(this.sprintCollection().doc(sprint.id).update(sprint));
  }

  public getSprintProgressHistory(sprint: Sprint, stories: Story[]): SprintProgress[] {

    const result: SprintProgress[] = [];

    if (stories !== undefined && stories.length > 0) {
      for (let day = 1; day <= sprint.meeting.day; day++) {

        const sprintProgress = SprintFactory.createProgress();
        sprintProgress.day = day;
        result.push(sprintProgress);

        stories.forEach(story => {
          const storyProgress = this.storyService.getProgress(story, day);
          if (storyProgress !== undefined) {
            this.setProgress(sprintProgress, storyProgress);
          }
        });
      }
    }
    return result;
  }

  private setProgress(sprintProgress: SprintProgress, storyProgress: StoryProgress) {

    if (storyProgress.storyId === undefined) {
      return;
    }
    sprintProgress.previous += storyProgress.previous;
    sprintProgress.daily += storyProgress.daily;
    sprintProgress.remaining += storyProgress.remaining;
    sprintProgress.total += storyProgress.total;

  }

  public generateActualCurve(sprint: Sprint, stories: Story[]): Array<any> {
    const result = [];

    result[0] = sprint.estimate;

    for (let day = 1; day <= sprint.duration; day++) {
      stories.forEach(story => {
        const progress: StoryProgress = this.storyService.getProgress(story, day);
        if (progress !== undefined) {
          if (result[day]) {
            result[day] += progress.remaining;
          } else {
            result[day] = progress.remaining;
          }
        }
      });
    }

    return result;
  }

  public generateIdealCurve(sprint: Sprint): Array<any> {

    const result = [];
    result[0] = sprint.estimate;

    for (let day = 1; day <= sprint.duration; day++) {
      const remaining = sprint.estimate - ((sprint.estimate * day) / sprint.duration);
      result[day] = remaining;
    }
    console.log(result)
    return result;
  }

  uploadSprintBackgroundAsBase64(sprint: Sprint, image: string) {


    const imageBase64 = image.replace('data:image/png;base64,', '');

    // Create a storage reference from our storage service
    const storageRef = this.firebaseApp.storage().ref();

    const uploadTask = storageRef.child(this.sprintsUrl() + `${sprint.id}/background.jpg`).putString(imageBase64, 'base64', { contentType: 'image/jpeg' });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload in progress
        //upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('upload success');
      }
    );
  }






  public static create(): Sprint {
    const result: Sprint = SprintFactory.create();

    const now = new Date();

    result.duration = 15;
    result.startDate = now.toISOString();
    result.endDate = now.toISOString();
    //result.startDate.setDate(result.startDate.getDate() + result.duration);

    return result;

  }

  private getFilterStatus(status: string): SprintFilter {
    if (SprintStatus.STARTED === status) {
      return SprintFilter.PROGRESS;
    }
    if (SprintStatus.NEW === status || undefined === status) {
      return SprintFilter.PENDING;
    }
    if (SprintStatus.CLOSED === status) {
      return SprintFilter.CLOSED;
    }
    return SprintFilter.PENDING;
  }

  public static progressAsPercentage(sprint: Sprint): number {
    let progress = 0;

    if (sprint === undefined) {
      return 0;
    }

    if (sprint.estimate <= 0) {
      return 0;
    }

    if (sprint.progress !== undefined) {
      progress = sprint.progress;
    }

    return Math.round((progress / sprint.estimate) * 100);

  }

  // public static updateProgress(sprint: Sprint, stories: Story[]) {
  //   if (sprint) {
  //     sprint.progress = 0;
  //     sprint.estimate = 0;
  //     sprint.progress = 0;
  //     if (stories && stories.length > 0) {
  //       stories.forEach(story => {
  //         sprint.estimate += story.estimate;
  //         const progress = this.storyService.getLatestProgress(story);
  //         if (progress) {
  //           sprint.progress += progress.total;
  //           sprint.remaining += progress.remaining;
  //         }
  //       });
  //     }
  //   }
  // }








}
