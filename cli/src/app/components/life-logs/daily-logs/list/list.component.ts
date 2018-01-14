import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  User,
  DailyLog,
} from 'app/interfaces/api-models';
import { SymptomName, Symptom } from 'app/constants/constants';
import { AccountService, DailyLogService } from 'app/shared/services/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  user: User;
  dailyLogList$: Observable<DailyLog[]>;

  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.loading$ = this.store.changes.pluck('loading');
    this.accountService.get().subscribe(user => this.user = user);
    this.dailyLogList$ = this.store.changes.pluck('dailyLogList');

    this.dailyLogService.list();
  }

  routeWithDate(dailyLog: DailyLog) {
    this.dailyLogService.storeData(dailyLog);
    this.router.navigate([`/life-log/daily/${dailyLog.id}`]);
  }

  getSymptomName(symptom: Symptom): string {
    return SymptomName.get(symptom);
  }

  getIcon(input: number): string {
    switch (input) {
      case 1:
        return '😄';
      case 2:
        return '☺️';
      case 3:
        return '😥';
    }
  }

}
