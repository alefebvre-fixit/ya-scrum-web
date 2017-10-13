import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SignUp, Invite } from '@ya-scrum/models';
import { UserService, GroupService, InviteService } from '@ya-scrum/services';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent implements OnInit {

  expired = false;
  isStandBy = false;
  signUpForm: FormGroup;
  invalidError = false;
  user: SignUp = new SignUp();

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private inviteService: InviteService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .flatMap((id) => this.inviteService.findOne(id))
      .flatMap((invite) => {
        this.user.invite = invite;
        return this.groupService.findOne(invite.groupId);
      })
      .subscribe(
      group => {
        this.user.group = group;
        console.log(this.user);
        if (this.user.invite) {

          this.signUpForm = this._fb.group({
            name: [this.user.invite.name, [<any>Validators.required]],
            email: [this.user.invite.email, [<any>Validators.required]],
            password: ['', [<any>Validators.required]],
          });
        } else {
          this.expired = true;
        }

      });
  }

  signUp() {
    this.standBy();


    const signup: SignUp = new SignUp();

    signup.name = this.signUpForm.value.name;
    signup.email = this.signUpForm.value.email;
    signup.password = this.signUpForm.value.password;

    this.groupService.signUp(this.user).subscribe(() => {
      this.router.navigate([`/sprints`]);
    }, error => {
      console.log(error);
      this.ready();
    });

  }

  signIn() {
    this.router.navigate([`/sign-in`]);
  }

  ready() {
    this.isStandBy = false;
  }

  standBy() {
    this.isStandBy = true;
  }


}
