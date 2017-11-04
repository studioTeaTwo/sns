import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/interfaces/api-models';
import { Store } from 'app/shared/store/store';
import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  account: User;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.get().subscribe(
      response => this.account = response
    );
  }

  update() {
    this.accountService.update(this.account).subscribe();
  }

}
