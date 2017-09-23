import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from 'app/interfaces/api-models'

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
  ) {
    this.currentLocation = location;
  }

  ngOnInit() {
    if (this.isLogin()) {
      this.account = JSON.parse(localStorage.getItem('account')) as User;
    }
  }

  get userProfile() {
    return '/user/' + this.account.id;
  }

  isDisplay() {
    return !this.currentLocation.path().match(/chat/);
  }

  isLogin() {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }
}
