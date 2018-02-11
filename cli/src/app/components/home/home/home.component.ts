import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { concatMap, filter, map, take } from 'rxjs/operators';
import * as Moment from 'moment';

import { Store } from 'app/core/store/store';
import { FriendExperienceStrongParameter, NotificationViewModel, Notification, User } from 'app/interfaces/api-models';
import { FeedService, AccountService } from 'app/core/services/api';
import { BeginnerAdvice } from 'app/interfaces/view-models';
import { TipsCollection } from 'app/constants/constants';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { Subscription } from 'rxjs/Subscription';

interface Experience {
  date: string;
  name: string;
  description: string;
  userLink: string;
  contentLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('adviceanimation', [
      transition('default => attention', [
        animate('250ms ease-in', style({transform: 'scale(1.0)'})),
        animate('500ms ease-in', style({transform: 'scale(1.2)'})),
        animate('750ms ease-in', style({transform: 'scale(1.0)'})),
      ]),
      transition('attention => default', [
        animate('250ms ease-in', style({transform: 'scale(1.0)'})),
        animate('500ms ease-in', style({transform: 'scale(1.2)'})),
        animate('750ms ease-in', style({transform: 'scale(1.0)'})),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  backgroundImageStyle: SafeStyle;
  animeState = 'default';
  hasTutorial = false;

  // 通知
  notifications$ = this.store.select<NotificationViewModel[]>(states => states.notificationList);
  beginners: BeginnerAdvice[] = [];
  readonly randomTips = TipsCollection;
  private subscriptions: Array<Subscription>;

  // 経験
  myExperienceDataSource: ExperienceDataSource | null;
  friendExperienceDataSource: ExperienceDataSource | null;
  myDisplayColumns = ['date', 'description'];
  friendDisplayColumns = ['date', 'name', 'description'];

  constructor(
    private router: Router,
    private store: Store,
    private sanitizer: DomSanitizer,
    private accountService: AccountService,
    private feedService: FeedService,
  ) { }

  ngOnInit() {
    this.subscriptions = [
      this.feedService.listNotifications().pipe(
          // TODO: intervalするか要検討
          concatMap(response => this.feedService.listExperiences()),
        )
        .subscribe(),
      this.notifications$.subscribe(data => {
        let image: string;
        if (data.length === 1) {
          image = `background-image: url('/assets/images/home_bg_notice_1.jpg')`;
        } else if (data.length === 2) {
          image = `background-image: url('/assets/images/home_bg_notice_2.jpg')`;
        } else if (data.length > 2) {
          image = `background-image: url('/assets/images/home_bg_notice_3.jpg')`;
        } else {
          image = `background-image: url('/assets/images/home_bg_normal_1.jpg')`;
        }
        this.backgroundImageStyle = this.sanitizer.bypassSecurityTrustStyle(image);
      })
    ];

    this.myExperienceDataSource = new ExperienceDataSource(this.store.select<Notification[]>(states => states.experienceList.mine));
    this.friendExperienceDataSource = new ExperienceDataSource(this.store.select<Notification[]>(states => states.experienceList.friend));

    this.createBeginnerAdvice();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onAnimeEnd(event) {
    if (!this.hasTutorial) {
      return;
    }

    if (event.toState === 'attention') {
      setTimeout(() => {
        this.animeState = 'default';
      }, 0);
    } else {
      setTimeout(() => {
        this.animeState = 'attention';
      }, 0);
    }
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
      // チュートリアルを設定
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
      // チュートリアルがあればアイコンをアニメーションさせる
      if (this.beginners.length > 0) {
        this.animeState = 'attention';
        this.hasTutorial = true;
      }
      // TIPSで埋める
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
    return this.feedSource.pipe(
      filter(data => data && data.length > 0),
      map(data => {
        const newData: Experience[] = [];
        // データを表示形式に整形する
        data.forEach((value: NotificationViewModel) => {
          let contentLink: string;
          if (value.type === 'DailyLog') {
            contentLink = `/life-log/daily/${value.linkId}`;
          } else if (value.type === 'Relationship') {
            contentLink = `/user/${value.linkId}`;
          } else {
            contentLink = '';
          }
          newData.push({
            date: value.createdAt,
            name: value.name,
            description: value.description,
            userLink: `/user/${value.userId}`,
            contentLink: contentLink,
          });
        });
        this.rowCount = newData.length;
        return newData;
      })
    );
  }

  disconnect() {}
}
