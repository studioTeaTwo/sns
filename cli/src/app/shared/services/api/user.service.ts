import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Store } from 'app/shared/store/store';
import {
  Profile,
} from 'app/interfaces/api-models';
import { ApiBaseService } from 'app/shared/services/api/api-base.service';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private apiBaseService: ApiBaseService,
  ) { }

  getProfile(userId: string) {
    this.apiBaseService.resetBeforeRequest({profile: {}});
    this.httpClient.get<Profile>(`/api/users/${userId}/profiles`)
      .subscribe(
        response => {
          this.onSuccessProfile(response);
        }
      );
  }

  searchByAllergenGroup(keyword: string) {
    this.apiBaseService.resetBeforeRequest({searchUsers: []});
    const params = new HttpParams().set('keyword', keyword);
    this.httpClient.get<Profile[]>(`/api/search/allergens`, {params: params})
      .subscribe(
        response => {
          this.onSuccessSearchUsers(response);
        },
        error => {
          this.apiBaseService.onNotFound({searchUsers: []});
        }
      );
  }

  searchByName(keyword: string) {
    this.apiBaseService.resetBeforeRequest({searchUsers: []});
    const params = new HttpParams().set('keyword', keyword);
    this.httpClient.get<Profile[]>(`/api/search/usernames`, {params: params})
      .subscribe(
        response => {
          this.onSuccessSearchUsers(response);
        },
        error => {
          this.apiBaseService.onNotFound({searchUsers: []});
        }
      );
  }

  private onSuccessProfile(data: Profile) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      profile: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessSearchUsers(data: Profile[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      searchUsers: data,
      loading: false,
      error: false,
    });
  }
}
