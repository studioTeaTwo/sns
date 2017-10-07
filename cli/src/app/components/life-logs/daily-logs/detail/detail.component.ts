import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  DailyLog,
} from 'app/interfaces/api-models';
import { DailyLogService } from 'app/shared/services/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  dailyLog$: Observable<DailyLog>;

  constructor(
    private store: Store,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.dailyLog$ = this.store.changes.pluck('dailyLog');
  }

}
