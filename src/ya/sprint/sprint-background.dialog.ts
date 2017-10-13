import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { NgxCroppieComponent } from '@ya-scrum/croppie';
import { CroppieOptions, ResultOptions, Format } from 'croppie';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './sprint-background.dialog.html',
  styleUrls: ['./sprint-background.dialog.scss'],
})
export class SprintBackgroundDialogComponent implements OnInit {

  @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

  sprint: Sprint;
  image: File;
  widthPx = '1024';
  heightPx = '400';
  croppieImage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SprintBackgroundDialogComponent>,
    private sprintService: SprintService,
  ) {
    if (data) {
      this.image = data.image;
      this.sprint = data.sprint;
    }
  }

  cancel() {
    this.dialogRef.close(true);
  }

  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }

  ngOnInit() {
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      this.croppieImage = fr.result;
    };
    fr.readAsDataURL(this.image);
  }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
  }

  public apply() {
      this.sprintService.uploadSprintBackgroundAsBase64(this.sprint, this.croppieImage);
      this.dialogRef.close(true);
  }



}
