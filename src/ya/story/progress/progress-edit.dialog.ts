import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';


@Component({
  templateUrl: './progress-edit.dialog.html',
  styleUrls: ['./progress-edit.dialog.scss'],
  providers: [UserService]
})
export class ProgressEditDialogComponent implements OnInit {

  public story: Story;
  public progress: StoryProgress;
  public storyForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProgressEditDialogComponent>,
    private sprintService: SprintService,
    private storyService: StoryService,
    private _fb: FormBuilder
  ) {
    this.story = data.story;
    this.progress = data.progress;
  }

  ngOnInit() {
    this.storyForm = this._fb.group({
      daily: [this.progress.daily, [<any>Validators.required]],
    });
  }

  apply() {
    this.progress = this.storyService.setDailyProgress(this.story, this.progress, this.storyForm.value.daily);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }


}
