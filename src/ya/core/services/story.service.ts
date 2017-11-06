import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { Sprint, Story, StoryFactory, StoryFilter, StoryProgress, StoryStatus } from '../models';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { YaService } from './ya.service';


@Injectable()
export class StoryService extends YaService {

  private storyTypes = [
    { key: 'feature', value: 'Feature' },
    { key: 'quality', value: 'Quality' },
    { key: 'performance', value: 'Performance' },
    { key: 'documentation', value: 'Documentation' },
    { key: 'design', value: 'Design' },
  ];

  private storyStatus = [
    { key: 'new', value: 'New' },
    { key: 'assigned', value: 'Assigned' },
    { key: 'started', value: 'Started' },
    { key: 'closed', value: 'Closed' },
  ];

  constructor(
    private afs: AngularFirestore,
    private authentication: AuthenticationService,
    private userService: UserService,
  ) {
    super(afs, authentication);
  }

  public getStoryTypes(): any {
    return this.storyTypes;
  }

  public getStoryStatus(): any {
    return this.storyStatus;
  }

  public instanciate(): Story {
    const result = StoryFactory.create();

    result.productOwnerId = this.userService.currentFirebaseUser().uid;

    return result;
  }

  public findAll(): Observable<Story[]> {
    return this.afs.collection<Story>(this.storiesUrl(), ref => ref.orderBy('priority')).valueChanges();
  }

  public findBySprintId(sprintId: string): Observable<Story[]> {
    return this.afs.collection<Story>(this.storiesUrl(), ref => ref.where('sprintId', '==', sprintId)).valueChanges();
  }

  public findNewStories(): Observable<Story[]> {
    return this.findByStatus('pending');
  }

  public findByStatus(status: string): Observable<Story[]> {
    return this.afs.collection<Story>(this.storiesUrl(), ref => ref.where('filter_status', '==', status)).valueChanges();
  }

  //TODO Should be useless now
  public sortByPriority(stories: Story[]) {
    return stories.sort((s1, s2) => {
      if (s1.priority > s2.priority) {
        return 1;
      }

      if (s1.priority < s2.priority) {
        return -1;
      }

      return 0;
    });
  }

  public findOne(id: string): Observable<Story> {
    return this.afs.doc<Story>(this.storiesUrl() + id).valueChanges();
  }

  public save(oldStory: Story, newStory: Story): Observable<void> {
    if (newStory.id) {
      return this.update(oldStory, newStory);
    } else {
      return this.create(newStory);
    }
  }

  private create(story: Story): Observable<void> {
    story.id = this.afs.createId();
    story.filter_status = this.getFilterStatus(story.status);
    return Observable.fromPromise(this.storyCollection().doc(story.id).set(story));
  }

  private update(oldStory: Story, newStory: Story): Observable<void> {
    newStory.filter_status = this.getFilterStatus(newStory.status);
    this.updateProgress(oldStory, newStory);
    return Observable.fromPromise(this.storyCollection().doc(newStory.id).update(newStory));
  }

  private updateProgress(oldStory: Story, newStory: Story) {

    const diff = newStory.estimate - oldStory.estimate;
    if (diff !== 0) {
      if (newStory.history && newStory.history.length > 0) {
        let previous: StoryProgress;
        for (const progress of newStory.history) {
          previous = this.calculateDailyProgress(newStory, progress, previous);
        }
      }
      if (newStory.sprintId !== undefined) {
        this.afs.doc<Sprint>(this.sprintsUrl() + newStory.sprintId).valueChanges().subscribe(sprint => {
          if (sprint) {
            this.sprintCollection().doc(sprint.id).update({ estimate: sprint.estimate + diff, remaining: sprint.remaining - diff });
          }
        });

      }
    }
  }

  public calculateDailyProgress(story: Story, progress: StoryProgress, previous: StoryProgress): StoryProgress {

    if (previous) {
      progress.previous = previous.total;
    } else {
      progress.previous = 0;
    }

    let actualDaily = progress.daily;
    const daily = progress.daily;

    progress.remaining = story.estimate - progress.previous;

    if (daily > 0 && daily > progress.remaining) {
      actualDaily = progress.remaining;
    }

    progress.daily = actualDaily;
    progress.total = progress.previous + progress.daily;
    progress.remaining = this.filterPositive(story.estimate - progress.total);

    return progress;
  }




  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Story>(this.storiesUrl() + id).delete());
  }

  public removeStoryFromSprint(story: Story) {

    const sprintId = story.sprintId;
    //Make it one transaction
    this.storyCollection().doc(story.id).update({ sprintId: 0, status: StoryStatus.NEW, filter_status: this.getFilterStatus(StoryStatus.NEW), history: [] });

    this.afs.doc<Sprint>(this.sprintsUrl() + sprintId).valueChanges().take(1).subscribe(sprint => {

      if (sprint.estimate !== undefined && sprint.estimate >= story.estimate) {
        sprint.estimate -= story.estimate;
      } else {
        sprint.estimate = 0;
      };

      const progress = this.getLatestProgress(story);
      if (progress) {
        if (sprint.progress !== undefined && sprint.progress >= progress.total) {
          sprint.progress -= progress.total;
        } else {
          sprint.progress = 0;
        };

        if (sprint.remaining !== undefined && sprint.remaining >= progress.remaining) {
          sprint.remaining -= progress.remaining;
        } else {
          sprint.remaining = 0;
        };

        if (sprint.storyNumber !== undefined && sprint.storyNumber > 0) {
          sprint.storyNumber = --sprint.storyNumber;
        } else {
          sprint.storyNumber = 0;
        }
      }

      this.sprintCollection().doc(sprint.id).update({
        estimate: sprint.estimate,
        progress: sprint.progress,
        remaining: sprint.remaining,
        storyNumber: sprint.storyNumber
      });
    });

  }


  public setDailyProgress(story: Story, progress: StoryProgress, daily: number): StoryProgress {

    const result: StoryProgress = Object.assign({}, progress);

    let value = daily;

    result.total = result.previous;
    result.remaining = story.estimate - result.total;

    if (daily > 0 && daily > result.remaining) {
      value = result.remaining;
    } else if (daily < 0 && -daily > result.daily) {
      value = - result.daily;
    }

    result.daily = value;
    result.total = result.previous + result.daily;
    result.remaining = this.filterPositive(story.estimate - result.total);
    return result;
  }

  public incrementDailyProgress(story: Story, progress: StoryProgress, increment: number): StoryProgress {
    return this.setDailyProgress(story, progress, progress.daily + increment);
  }

  public assignDailyProgress(story: Story, progress: StoryProgress): Story {

    if (!story.history) {
      return story;
    }

    story.history[progress.day - 1] = progress;
    const latest = this.getLatestProgress(story);
    if (latest.total > 0) {
      if (latest.remaining === 0) {
        story.status = StoryStatus.CLOSED;
      } else {
        story.status = StoryStatus.STARTED;
      }
    } else {
      story.status = StoryStatus.ASSIGNED;
    }

    return story;

  }

  public getProgress(story: Story, day: number): StoryProgress {
    if (story.history) {
      for (const progress of story.history) {
        if (progress && progress.day === day) {
          return progress;
        }
      }
    }
    return undefined;
  }

  public getLatestProgress(story: Story): StoryProgress {

    let result: StoryProgress;

    if (story && story.history) {
      result = this.getProgress(story, story.history.length);
    }

    return result;
  }

  public cancelLastMeeting(story: Story) {
    if (story && story.history && story.history.length > 0) {
      story.history.splice(-1, 1);
    }
    if (story.history === undefined) {
      story.history = [];
    }
  }


  public initDailyMeeting(story: Story, day: number) {

    const result = StoryFactory.createProgress();

    result.storyId = story.id;
    result.day = day;
    result.date = new Date();

    const previous = this.getProgress(story, day - 1);
    if (previous) {
      result.previous = previous.previous + previous.daily;
      result.total = previous.previous + previous.daily;
      result.daily = 0;
      result.remaining = story.estimate - (previous.previous + previous.daily);
    } else {
      result.previous = 0;
      result.daily = 0;
      result.total = 0;
      result.remaining = story.estimate;
    }

    this.setMeeting(story, result);

  }

  private setMeeting(story: Story, progress: StoryProgress) {

    if (story.history === undefined) {
      story.history = new Array<StoryProgress>();
    }

    //if (progress.day > 0 && progress.day <= story.history.length) {
    if (progress.day > 0) {
      story.history[progress.day - 1] = progress;
    }

  }

  public getFilterStatus(status: string): StoryFilter {
    if (StoryStatus.STARTED === status || StoryStatus.ASSIGNED === status) {
      return StoryFilter.PROGRESS;
    }
    if (StoryStatus.NEW === status || undefined === status) {
      return StoryFilter.PENDING;
    }
    return StoryFilter.PENDING;
  }

  public storyProgress(story: Story): number {
    const latest = this.getLatestProgress(story);
    if (latest && story.estimate > 0) {
      return (latest.total / story.estimate) * 100;
    } else {
      return 0;
    }
  }


  public meetingProgress(story: StoryProgress): number {

    if (story === undefined) {
      return 0;
    }

    const total = story.daily + story.previous + story.remaining;
    const progress = story.daily + story.previous;

    if (total === 0) {
      return 0;
    }

    return Math.round((progress / total) * 100);
  }

}
