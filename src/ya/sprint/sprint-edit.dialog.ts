import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MAT_DIALOG_DATA } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './sprint-edit.dialog.html',
  styleUrls: ['./sprint-edit.dialog.scss'],
})
export class SprintEditDialogComponent implements OnInit {

  sprint: Sprint;
  users: Observable<User[]>;
  scrummaster: User;
  sprintForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SprintEditDialogComponent>,
    public sprintService: SprintService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
    console.log(data)
    this.sprint = data.sprint;
  }

  ngOnInit() {

    this.users = this.userService.findAll();

    if (this.sprint.scrumMasterId) {
      this.userService.findOne(this.sprint.scrumMasterId).subscribe(
        user => {

          this.scrummaster = user;

          this.sprintForm = this._fb.group({
            name: [this.sprint.name, [<any>Validators.required]],
            velocity: [this.sprint.velocity, [<any>Validators.required]],
            duration: [this.sprint.duration, [<any>Validators.required]],
            startDate: [new Date(this.sprint.startDate)],
            endDate: [new Date(this.sprint.endDate)],
            scrummaster: [this.scrummaster],
          });
        }
      );
    }


  }

  apply() {

    this.sprint.name = this.sprintForm.value.name;
    this.sprint.velocity = this.sprintForm.value.velocity;
    this.sprint.duration = this.sprintForm.value.duration;
    this.sprint.startDate = this.sprintForm.value.startDate.toISOString();
    this.sprint.endDate = this.sprintForm.value.endDate.toISOString();

    if (this.sprintForm.value.scrummaster) {
      this.sprint.scrumMasterId = this.sprintForm.value.scrummaster.id;
    }

    this.sprintService.save(this.sprint).subscribe(
      () => this.dialogRef.close(this.sprint)
    );
    

  }

  cancel() {
    this.dialogRef.close(true);
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }


}
