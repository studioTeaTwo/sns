import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { User } from 'app/interfaces/api-models';
import { AccountService } from 'app/core/services/api';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentLocation;

  constructor(
    private location: Location,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.currentLocation = location;
  }

  ngOnInit() {
  }

  getMyProfile() {
    this.accountService.get().subscribe(response => {
      this.router.navigate([`/user/${response.id}`]);
    });
  }

  onClickBack() {
    this.router.navigateByUrl(`/home`);
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }

  isAdmin(): Observable<User> {
    return this.accountService.get().filter(response => !!response);
  }

  // GlobalMenuComponentにも同じメソッドあり
  isDisplay(): boolean {
    return !this.location.path().match(/(signup|chat+\/[0-9-]|life-log\/daily\/logging)/);
  }

  logout() {
    this.accountService.logout().subscribe(() => this.router.navigate([`/`]));
  }
}
