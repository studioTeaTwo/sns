import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/interfaces/api-models';
import { Store } from 'app/core/store/store';
import { AccountService } from 'app/core/services/api';
import { NgForm, NgModel } from '@angular/forms';

import { SymptomName, AllergenGroupName } from 'app/constants/constants';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  readonly SymptomName = SymptomName;
  readonly AllergenGroupName = AllergenGroupName;

  account: User;
  oldPassword = '';
  rePassword = '';
  currentPassword = '';

  showBasic = false;
  showSymptom = false;
  showAllergenGroup = false;

  isErrorEmail = false;
  isErrorPassword = false;
  isErrorRePassword = false;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (params['open'] === 'showBasic') {
          this.showBasic = true;
          this.showSymptom = false;
          this.showAllergenGroup = false;
        } else if (params['open'] === 'showAllergenGroup') {
          this.showBasic = false;
          this.showSymptom = false;
          this.showAllergenGroup = true;
        } else {
          this.showBasic = false;
          this.showSymptom = true;
          this.showAllergenGroup = false;
        }
      });
    this.accountService.get().subscribe(
      response => this.account = response
    );
  }

  onChangeEmail() {
    this.isErrorEmail = !this.accountService.emailValidator(this.account.email);
  }

  onChangePassword() {
    if (this.oldPassword.length === 0) {
      this.isErrorPassword = false;
      this.isErrorRePassword = false;
      return;
    }
    this.isErrorPassword = !this.accountService.passwordValidator(this.oldPassword);
    this.isErrorRePassword = this.oldPassword !== this.rePassword;
  }

  onChangeRePassword() {
    this.isErrorRePassword = this.oldPassword !== this.rePassword;
  }

  update(form: NgForm) {
    if (form.invalid || this.isErrorRePassword) {
      return;
    }
    this.accountService.update(this.account, this.oldPassword, this.currentPassword).subscribe(() => {
      this.snackBar.open('変更しました！', null, {
        duration: 2000,
      });
    });
  }

}
