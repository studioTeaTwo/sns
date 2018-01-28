import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
} from 'app/shared/services/api';
import { NAVI_CHARA } from 'app/constants/constants';
import { User } from 'app/interfaces/api-models';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  JSON = JSON;
  sessionResponse: any;
  accountResponse$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private chatService: ChatService,
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

  sighup() {
    this.router.navigate(['auth/signup']);
  }

  login() {
    this.accountService.login('t2.tide@gmail.com', 'allergy');
  }

  isAdmin(): Observable<User> {
    return this.accountService.get().filter(response => !!response);
  }

  private getMe() {
    this.accountService.get();
  }
}
