import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SignUp } from '@ya-scrum/models';
import { UserService, GroupService } from '@ya-scrum/services';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  isStandBy = false;
  signUpForm: FormGroup;
  invalidError = false;

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private _fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      name: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
    });
  }

  signUp() {
    this.standBy();


    const signup: SignUp = new SignUp();

    signup.name = this.signUpForm.value.name;
    signup.email = this.signUpForm.value.email;
    signup.password = this.signUpForm.value.password;

    this.groupService.registerSignUp(signup);
    this.router.navigate([`/group-create`]);
    
    // this.userService.signUp(signup).subscribe(() => {
    //   this.router.navigate([`/sprints`]);
    // }, error => {
    //   console.log(error); this.ready();
    // });
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
