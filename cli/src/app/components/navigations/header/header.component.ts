import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
    private accountService: AccountService,
  ) {
    this.currentLocation = location;
  }

  ngOnInit() {
  }

  get userId() {
    this.accountService.get().subscribe(response => this.account = response);
    return '/user/' + this.account.id;
  }

  isDisplay() {
    return !this.currentLocation.path().match(/chat+\/[0-9-]/);
  }

  isLogin() {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }

  logout() {
    this.accountService.logout();
  }
}
