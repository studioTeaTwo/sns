import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.accountService.login('allelog@gmail.com', 'allergy');
    this.token = localStorage.getItem('allergylog');
  }

}
