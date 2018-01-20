import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { User } from 'app/interfaces/api-models';
import { UserService } from 'app/shared/services/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = this.store.select<User[]>(state => state.users);

  constructor(
    private store: Store,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.list();
  }

}
