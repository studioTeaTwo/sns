import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  User,
  DailyLog,
} from 'app/interfaces/api-models';
import { DailyLogService } from 'app/shared/services/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dailyLogList$: Observable<DailyLog[]>;

  constructor(
    private router: Router,
    private store: Store,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.dailyLogList$ = this.store.changes.pluck('dailyLogList');

    this.dailyLogService.list();
  }

  routeWithDate(dailyLog: DailyLog) {
    this.dailyLogService.storeData(dailyLog);
    this.router.navigate([`/life-log/daily/${dailyLog.id}`]);
  }

}
