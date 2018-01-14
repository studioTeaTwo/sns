import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/interfaces/api-models';
import { Store } from 'app/shared/store/store';
import { AccountService } from 'app/shared/services/api';
import { NgForm, NgModel } from '@angular/forms';

import { SymptomName } from 'app/constants/constants';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  readonly SymptomName = SymptomName;

  account: User;
  password = '';
  rePassword = '';
  currentPassword = '';

  isErrorEmail = false;
  isErrorPassword = false;
  isErrorRePassword = false;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.get().subscribe(
      response => this.account = response
    );
  }

  onChangeEmail() {
    this.isErrorEmail = !this.accountService.emailValidator(this.account.email);
  }

  onChangePassword() {
    if (this.password.length === 0) {
      this.isErrorPassword = false;
      this.isErrorRePassword = false;
      return;
    }
    this.isErrorPassword = !this.accountService.passwordValidator(this.password);
    this.isErrorRePassword = this.password !== this.rePassword;
  }

  onChangeRePassword() {
    this.isErrorRePassword = this.password !== this.rePassword;
  }

  update(form: NgForm) {
    if (form.invalid || this.isErrorRePassword) {
      return;
    }
    this.accountService.update(this.account, this.password, this.currentPassword).subscribe(() => {
      this.snackBar.open('変更しました！', null, {
        duration: 2000,
      });
    });
  }

}
