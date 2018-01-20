import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import * as Moment from 'moment';

import { Store } from 'app/shared/store/store';
import { FriendExperienceStrongParameter, NotificationViewModel, Notification } from 'app/interfaces/api-models';
import { FeedService, AccountService } from 'app/shared/services/api';

interface Experience {
  date: string;
  name: string;
  activity: string;
}
interface BeginnerAdvice {
  type: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 通知
  notifications$ = this.store.select<NotificationViewModel[]>(state => state.notificationList);
  beginners: BeginnerAdvice[] = [];

  // 経験
  myExperienceDataSource: ExperienceDataSource | null;
  friendExperienceDataSource: ExperienceDataSource | null;
  myDisplayColumns = ['date', 'activity'];
  friendDisplayColumns = ['date', 'name', 'activity'];

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.feedService.listNotifications();
    this.feedService.listExperiences();
    this.myExperienceDataSource = new ExperienceDataSource(this.store.select<Notification[]>(state => state.experienceList.mine));
    this.friendExperienceDataSource = new ExperienceDataSource(this.store.select<Notification[]>(state => state.experienceList.friend));

    this.createBeginnerAdvice();
  }

  onClickNotification(value: NotificationViewModel) {
    if (value.type === 'DailyLog') {
      this.router.navigateByUrl(`/life-log/daily/logging/${value.linkId}`);
    } else if (value.type === 'Chat') {
      this.router.navigateByUrl(`/chat/${value.linkId}`);
    } else if (value.type === 'Followed') {
      this.feedService.readNotification(value.id);
      this.router.navigateByUrl(`/user/${value.linkId}`);
    }
  }

  onClickBeginner(beginner: BeginnerAdvice) {
    if (beginner.type === 'selfIntroduction') {
      this.router.navigateByUrl(`/user/setting`);
    }
  }

  private createBeginnerAdvice() {
    this.accountService.get().subscribe(user => {
      if (!user.selfIntroduction || user.selfIntroduction.length === 0) {
        this.beginners.push({
          type: 'selfIntroduction',
          description: '自己紹介を記入しよう',
        });
      }
    });
  }
}

class ExperienceDataSource extends DataSource<any> {
  rowCount: number;

  constructor(
    private feedSource: Observable<Notification[]>
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
            activity: value.description,
          });
        });
        this.rowCount = newData.length;
        return newData;
      });
  }

  disconnect() {}
}
