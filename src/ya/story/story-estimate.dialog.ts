import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';


import { StoryService, SprintService, UserService, ThemeService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './story-estimate.dialog.html',
  styleUrls: ['./story-estimate.dialog.scss'],
})
export class StoryEstimateDialogComponent implements OnInit {

  loading = false;

  story: Story;
  storyForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StoryEstimateDialogComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    private themeService: ThemeService,
    private _fb: FormBuilder
  ) {
    this.story = data.story;
  }

  ngOnInit() {
    this.storyForm = this._fb.group({
      estimate: [this.story.estimate, [<any>Validators.required]],
    });
  }

  apply() {

    const cloned = Object.assign({}, this.story);

    cloned.estimate = this.storyForm.value.estimate;

    this.loading = true;
    this.storyService.save(this.story, cloned).subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(cloned);
      }
    );

  }

  cancel() {
    this.dialogRef.close();
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }


}
