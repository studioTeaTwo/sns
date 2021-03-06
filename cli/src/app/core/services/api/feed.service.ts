import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from 'app/core/store/store';
import { Experience, NotificationViewModel } from 'app/interfaces/api-models';

@Injectable()
export class FeedService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  listNotifications(): Observable<void> {
    return this.httpClient.get<NotificationViewModel[]>(`/api/feed/notifications`).pipe(
      map(response => {
        this.onSuccessNotificationList(response);
      }),
    );
  }

  listExperiences(): Observable<void> {
    return this.httpClient.get<Experience>(`/api/feed/experiences`).pipe(
      map(response => {
        this.onSuccessExperienceList(response);
      }),
    );
  }

  readNotification(id: number) {
    this.httpClient.delete(`/api/feed/notifications/${id}`).subscribe(response => {
      this.onSuccessReadNotification(id);
    });
  }

  private onSuccessNotificationList(data: NotificationViewModel[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      notificationList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessExperienceList(data: Experience) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      experienceList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessReadNotification(id: number) {
    const currentState = this.store.getState();
    const newData = currentState.notificationList.filter(value => value.id !== id);
    this.store.setState({
      ...currentState,
      notificationList: newData,
      loading: false,
      error: false,
    });
  }
}
