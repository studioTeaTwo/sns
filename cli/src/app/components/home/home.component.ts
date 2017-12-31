import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { FriendExperienceStrongParameter } from 'app/interfaces/api-models';
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

  // 通知
  notificationCount = 2;

  // アクティビティ
  myExperienceDataSource: ExperienceDataSource | null;
  friendExperienceDataSource: ExperienceDataSource | null;
  myDisplayColumns = ['date', 'activity'];
  friendDisplayColumns = ['date', 'name', 'activity'];

  constructor(
    private store: Store,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.feedService.listActivities();
    this.myExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('activityList', 'mine'));
    this.friendExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('activityList', 'friend'));
  }

  onClickBadge() {

  }
}

class ExperienceDataSource extends DataSource<any> {
  rowCount: number;

  constructor(
    private feedSource: Observable<FriendExperienceStrongParameter[]>
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
