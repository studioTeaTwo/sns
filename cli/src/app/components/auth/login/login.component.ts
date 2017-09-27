import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  isErrorEmail = false;
  isErrorPassword = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
  }

  onChangeEmail() {
    this.isErrorEmail = !this.accountService.emailValidator(this.email);
    console.log(this.isErrorEmail);
  }

  onChangePassword() {
    this.isErrorPassword = !this.accountService.passwordValidator(this.password);
  }

  login() {
    this.accountService.login(this.email, this.password)
     .subscribe(() => this.router.navigate(['home']));
  }

}