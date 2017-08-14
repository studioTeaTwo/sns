import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Store } from 'app/shared/store/store';
import { AccountService } from 'app/shared/services/api';

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
    private store: Store,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountResponse$ = this.store.changes.pluck('account');
  }

  login() {
    this.accountService.login('allelog@gmail.com', 'allergy')
      .subscribe(() => {
        this.sessionResponse = localStorage.getItem('allergylog');
        this.getMe();
      });
  }

  private getMe() {
    this.accountService.get();
  }
}
