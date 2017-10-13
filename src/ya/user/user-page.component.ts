import { Component, OnInit, Input } from '@angular/core';

import { User } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
