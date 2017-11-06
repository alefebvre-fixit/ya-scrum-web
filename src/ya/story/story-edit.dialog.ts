import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';


import { StoryService, SprintService, UserService, ThemeService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './story-edit.dialog.html',
  styleUrls: ['./story-edit.dialog.scss'],
})
export class StoryEditDialogComponent implements OnInit {

  loading = false;
  mode = 'create';

  story: Story;
  storyForm: FormGroup;
  typeList: any;
  users: Observable<User[]>;
  productOwner: User;
  themeList: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StoryEditDialogComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    private themeService: ThemeService,
    private _fb: FormBuilder
  ) {
    this.story = data.story;

    if (this.story && this.story.id) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
    }

  }

  ngOnInit() {

    this.typeList = this.storyService.getStoryTypes();
    this.themeList = this.themeService.findAllThemeNames();

    this.users = this.userService.findAll();

    if (this.story.productOwnerId) {
      this.userService.findOne(this.story.productOwnerId).subscribe(user => {
        this.productOwner = user;

        this.storyForm = this._fb.group({
          name: [this.story.name, [<any>Validators.required]],
          description: [this.story.description, [<any>Validators.required]],
          criterias: [this.story.acceptanceCriterias, [<any>Validators.required]],
          type: [this.story.type, [<any>Validators.required]],
          priority: [this.story.priority, [<any>Validators.required]],
          estimate: [this.story.estimate, [<any>Validators.required]],
          theme: [this.story.theme, [<any>Validators.required]],
          productOwner: [this.productOwner],
        });

      });

    }

  }

  apply() {

    const cloned = Object.assign({}, this.story);


    cloned.name = this.storyForm.value.name;
    cloned.description = this.storyForm.value.description;
    cloned.acceptanceCriterias = this.storyForm.value.criterias;
    cloned.priority = this.storyForm.value.priority;
    cloned.estimate = this.storyForm.value.estimate;
    cloned.type = this.storyForm.value.type;
    cloned.theme = this.storyForm.value.theme;

    if (this.storyForm.value.productOwner) {
      cloned.productOwnerId = this.storyForm.value.productOwner.id;
    }

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
