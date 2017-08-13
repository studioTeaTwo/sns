import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  sessionResponse: any;
  userResponse: any;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.accountService.login('allelog@gmail.com', 'allergy')
    .subscribe(response => {
      this.sessionResponse = JSON.stringify(response);
      this.getMe();
    });
  }

  private getMe() {
    this.accountService.get().subscribe(response => {
      this.userResponse = JSON.stringify(response);
    });
  }

}
