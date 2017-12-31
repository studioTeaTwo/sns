import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { Activity } from 'app/interfaces/api-models';

@Injectable()
export class FeedService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  listActivities() {
    this.httpClient.get<Activity>(`/api/feed/activities`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  private onSuccessList(data: Activity) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      activityList: data,
      loading: false,
      error: false,
    });
  }

}
