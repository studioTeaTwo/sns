import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from 'app/shared/store/store';
import { User } from 'app/interfaces/api-models'
import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentLocation;
  account: User;

  constructor(
    private location: Location,
    private store: Store,
    private accountService: AccountService,
  ) {
    this.currentLocation = location;
  }

  ngOnInit() {
    if (this.isLogin()) {
      this.accountService.get().subscribe(response => this.account = response);
    }
  }

  isDisplay() {
    return !this.currentLocation.path().match(/chat/);
  }

  isLogin() {
    return localStorage.getItem('token');
  }

}
