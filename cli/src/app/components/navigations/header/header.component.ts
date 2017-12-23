import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { User } from 'app/interfaces/api-models'
import { AccountService } from 'app/shared/services/api';

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

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }

  logout() {
    this.accountService.logout().subscribe(() => this.router.navigate([`/`]));
  }
}
