import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
} from 'app/shared/services/api';
import { NAVI_CHARA } from 'app/constants/constants';

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
  ) { }

  ngOnInit() {
    this.accountResponse$ = this.store.changes.pluck('account');
  }

  sighup() {
    this.chatService.post(NAVI_CHARA.id)
      .subscribe(
        response => {
          this.router.navigate([`chat/${response.id}`]);
        }
      );
  }

  login() {
    this.accountService.login('t2.tide@gmail.com', 'allergy')
      .subscribe(() => {
        this.sessionResponse = localStorage.getItem('allergylog');
        this.getMe();
      });
  }

  private getMe() {
    this.accountService.get();
  }
}
