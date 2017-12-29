import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { Feed } from 'app/interfaces/api-models';

@Injectable()
export class FeedService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  list() {
    this.httpClient.get<Feed>(`/api/feeds`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  private onSuccessList(data: Feed) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      feedList: data,
      loading: false,
      error: false,
    });
  }

}
