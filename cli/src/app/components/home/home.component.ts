import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { FriendExperienceStrongParameter, NotificationViewModel } from 'app/interfaces/api-models';
import { ActivityType, ActivityTypeName } from 'app/constants/constants';
import { FeedService } from 'app/shared/services/api';

interface Experience {
  date: string;
  name: string;
  activity: ActivityType;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 通知
  notifications$: Observable<NotificationViewModel[]>;

  // 経験
  myExperienceDataSource: ExperienceDataSource | null;
  friendExperienceDataSource: ExperienceDataSource | null;
  myDisplayColumns = ['date', 'experience'];
  friendDisplayColumns = ['date', 'name', 'experience'];

  constructor(
    private store: Store,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.feedService.listNotifications();
    this.feedService.listExperiences();
    this.notifications$ = this.store.changes.pluck('notificationList');
    this.myExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('experienceList', 'mine'));
    this.friendExperienceDataSource = new ExperienceDataSource(this.store.changes.pluck('experienceList', 'friend'));
  }

  getNotificationLink(value: NotificationViewModel): string {
    let link: string;
    if (value.type === 'DailyLog') {
      link = `/life-log/daily/logging/${value.linkId}`;
    } else if (value.type === 'Chat') {
      link = `/chat/${value.linkId}`;
    }
    return link;
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
            activity: ActivityTypeName[value.activityType],
          });
        });
        this.rowCount = newData.length;
        return newData;
      });
  }

  disconnect() {}
}
