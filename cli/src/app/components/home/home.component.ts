import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;
  name: string;
  email: string;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.accountService.login('allelog@gmail.com', 'allergy')
    .subscribe(() => {
      this.token = localStorage.getItem('allergylog');
      this.getMe();
    });
  }

  private getMe() {
    this.accountService.get().subscribe(response => {
      this.name = response.name;
      this.email = response.email;
    });
  }

}
