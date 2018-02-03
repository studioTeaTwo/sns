import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import * as Moment from 'moment';

import { Store } from 'app/core/store/store';
import { FriendExperienceStrongParameter, NotificationViewModel, Notification, User } from 'app/interfaces/api-models';
import { FeedService, AccountService } from 'app/core/services/api';
import { BeginnerAdvice } from 'app/interfaces/view-models';
import { TipsCollection } from 'app/constants/constants';

interface Experience {
  date: string;
  name: string;
  activity: string;
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
  readonly randomTips = TipsCollection;

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
    this.feedService.listNotifications()
      .concatMap(response => this.feedService.listExperiences())
      .subscribe();
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
    if (beginner.adviceType === 'selfIntroduction') {
      this.router.navigate([`/user/setting`], { queryParams: { open: 'showBasic' } });
    }
    if (beginner.adviceType === 'allergenGroup') {
      this.router.navigate([`/user/setting`], { queryParams: { open: 'showAllergenGroup' } });
    }
    if (beginner.adviceType === 'tips') {
      // this.router.navigate([`/tips\#${beginner.tipsType}`]);
      this.router.navigate([`/home/tips`]);
    }
  }

  private createBeginnerAdvice() {
    this.accountService.get().subscribe(user => {
      if (!user.selfIntroduction || user.selfIntroduction.length === 0) {
        this.beginners.push({
          adviceType: 'selfIntroduction',
          description: '自己紹介を記入しよう',
        });
      }
      if ((user.classification === 1 || user.classification === 2) && !this.hasAllergenGroup(user)) {
        this.beginners.push({
          adviceType: 'allergenGroup',
          description: 'アレルゲンを記入しよう',
        });
      }
      if (this.beginners.length < 3) {
        const tmp = [...this.randomTips];
        const legth = this.beginners.length;
        for (let i = 3; i > length; i--) {
          const random = Math.floor(Math.random() * ((tmp.length - 1) - 0) + 0);
          const newItem = tmp.splice(random, 1);
          this.beginners.push(newItem[0]);
        }
      }
    });
  }

  private hasAllergenGroup(user: User): boolean {
    const result = Object.keys(user).find(key => key.includes('allergenGroup') && user[key]);
    return result ? true : false;
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
