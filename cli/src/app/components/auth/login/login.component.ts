import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  isErrorEmail = false;
  isErrorPassword = false;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {}

  onChangeEmail() {
    this.isErrorEmail = !this.accountService.emailValidator(this.email);
  }

  onChangePassword() {
    this.isErrorPassword = !this.accountService.passwordValidator(this.password);
  }

  login() {
    this.accountService
      .login(this.email, this.password)
      .subscribe(() => this.router.navigate(['home']));
  }
}
