import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { InviteService } from '@ya-scrum/services';
import { Invite } from '@ya-scrum/models';

@Component({
  templateUrl: './edit-invite-dialog.html',
  styleUrls: ['./edit-invite-dialog.scss'],
})
export class EditInviteDialogComponent implements OnInit {

  loading = false;
  invite: Invite;
  inviteForm: FormGroup;
  errors: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditInviteDialogComponent>,
    public inviteService: InviteService,
    private _fb: FormBuilder
  ) {
    this.invite = data.invite;
  }

  ngOnInit() {
    this.inviteForm = this._fb.group({
      name: [{ value: this.invite.name, disabled: this.isEdit() }, [<any>Validators.required]],
      email: [{ value: this.invite.email, disabled: this.isEdit() }, [<any>Validators.required]],
    });
  }

  apply() {

    this.invite.name = this.inviteForm.value.name;
    this.invite.email = this.inviteForm.value.email;

    this.loading = true;
    this.errors = undefined;

    this.inviteService.findByEmail(this.invite.email).take(1).subscribe(
      invites => {
        if (invites && invites.length > 0) {
          this.errors = 'An Invite has already been sent to this address';
          this.loading = false;
        } else {
          this.inviteService.save(this.invite).flatMap( () => this.inviteService.findOne(this.invite.id)).subscribe((invite: Invite) => {
            this.invite = invite;
            this.loading = false;
          });
        }
      }
    );
  }

  cancelInvite() {
    this.loading = true;

    this.inviteService.delete(this.invite.id).subscribe(() => {
      this.loading = false;
      this.dialogRef.close();
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  public getUrl() {
    return this.inviteService.buildUrl(this.invite);
  }

  isEdit(): boolean {
    return this.invite.id !== undefined;
  }



}
