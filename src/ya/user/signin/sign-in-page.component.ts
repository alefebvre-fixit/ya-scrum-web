import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SignIn } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  isStandBy = false;
  signInForm: FormGroup;
  invalidError = false;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this._fb.group({
      email: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
    });
  }

  emailSignIn() {
    this.standBy();
    const signin: SignIn = new SignIn();

    signin.email = this.signInForm.value.email;
    signin.password = this.signInForm.value.password;

    this.userService.emailSignIn(signin).subscribe((u) => {
      this.router.navigate([`/sprints`]);
    }, error => { this.invalidError = true; this.ready(); });

  }

  signUp() {
    this.router.navigate([`/sign-up`]);
  }

  ready() {
    this.isStandBy = false;
  }

  standBy() {
    this.isStandBy = true;
  }

}
