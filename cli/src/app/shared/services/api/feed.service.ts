import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { Activity, Notification } from 'app/interfaces/api-models';

@Injectable()
export class FeedService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  listNotifications() {
    this.httpClient.get<Notification[]>(`/api/feed/notifications`)
      .subscribe(
        response => {
          this.onSuccessNotificationList(response);
        }
      );
  }

  listActivities() {
    this.httpClient.get<Activity>(`/api/feed/activities`)
      .subscribe(
        response => {
          this.onSuccessActivityList(response);
        }
      );
  }

  private onSuccessNotificationList(data: Notification[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      notificationList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessActivityList(data: Activity) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      activityList: data,
      loading: false,
      error: false,
    });
  }

}
