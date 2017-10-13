import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Account } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  accountForm: FormGroup;
  account: Account;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userService.findCurrentAccount().subscribe(account => {
    this.account = account;
      this.accountForm = this._fb.group({
        role: [this.account.role, [<any>Validators.required]],
        team: [this.account.team, [<any>Validators.required]],
      });
    });

  }

  onSubmit() {

    this.account.role = this.accountForm.value.role;
    this.account.team = this.accountForm.value.team;

    this.userService.saveAccount(this.account);
    this.userService.save(this.account);
  }



}
