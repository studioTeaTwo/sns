import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Store } from 'app/shared/store/store';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  getProfile(userId: string) {
    this.httpClient.get<any>(`/api/profiles/${userId}`)
      .subscribe(
        response => {
          this.onSuccessProfile(response);
        }
      );
  }

  getSearchName(search_key: string) {
    const params: HttpParams = new HttpParams().set('search_key', search_key);
    this.httpClient.get<any>(`/api/search/usernames`, { params })
      .subscribe(
        response => {
          this.onSuccessSearchUsers(response);
        }
      );
  }

  private onSuccessProfile(data) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      profile: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessSearchUsers(data) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      searchUsers: data,
      loading: false,
      error: false,
    });
  }
}
