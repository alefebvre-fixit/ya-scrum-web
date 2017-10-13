import { Component, OnInit, Input } from '@angular/core';

import { User } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ya-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.users = this.userService.findAll();
  }

}
