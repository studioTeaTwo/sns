import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { FeedViewModel, OtherExperienceStrongParameter } from 'app/interfaces/api-models';
import { Activity, ActivityName } from 'app/constants/constants';
import { FeedService } from 'app/shared/services/api';

interface Experience {
  date: string;
  name: string;
  activity: Activity;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myExperienceDataSource: ExperienceDataSource | null;
  otherExperienceDataSource: ExperienceDataSource | null;
  myDisplayColumns = ['date', 'activity'];
  otherDisplayColumns = ['date', 'name', 'activity'];

  constructor(
    private store: Store,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.feedService.list();
    this.myExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('feedList', 'mine'));
    this.otherExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('feedList', 'others'));
  }
}

class ExperienceDataSource extends DataSource<any> {
  rowCount: number;

  constructor(
    private feedSource: Observable<OtherExperienceStrongParameter[]>
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Experience[]> {
    return this.feedSource
      .filter(data => data && data.length > 0)
      .map(data => {
        const newData: Experience[] = [];
        // データを表示形式に整形する
        data.forEach(value => {
          newData.push({
            date: value.createdAt,
            name: value.name,
            activity: ActivityName[value.activityType],
          });
        });
        this.rowCount = newData.length;
        return newData;
      });
  }

  disconnect() {}
}
