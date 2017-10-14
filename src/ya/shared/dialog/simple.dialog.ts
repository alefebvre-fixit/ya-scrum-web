import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';


import { StoryService, SprintService, UserService, ThemeService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './simple.dialog.html',
  styleUrls: ['./simple.dialog.scss'],
})
export class SimpleDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
  ) {
  }

  ngOnInit() {
  }

  apply() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }


}
