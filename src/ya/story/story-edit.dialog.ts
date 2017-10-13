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

    selectedValue: string;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  apply() {

    this.story.name = this.storyForm.value.name;
    this.story.description = this.storyForm.value.description;
    this.story.acceptanceCriterias = this.storyForm.value.criterias;
    this.story.priority = this.storyForm.value.priority;
    this.story.estimate = this.storyForm.value.estimate;
    this.story.type = this.storyForm.value.type;
    this.story.theme = this.storyForm.value.theme;

    if (this.storyForm.value.productOwner) {
      this.story.productOwnerId = this.storyForm.value.productOwner.id;
    }

    this.storyService.save(this.story).subscribe( () => this.dialogRef.close(this.story));

  }

  cancel() {
    this.dialogRef.close();
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }


}
