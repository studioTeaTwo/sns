import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Store } from 'app/core/store/store';
import { Profile, RelationshipRequestBody, User } from 'app/interfaces/api-models';
import { ApiBaseService } from 'app/core/services/api/api-base.service';

@Injectable()
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private apiBaseService: ApiBaseService,
  ) {}

  list() {
    this.apiBaseService.resetBeforeRequest({ users: [] });
    this.httpClient.get<User[]>(`/api/users`).subscribe(response => {
      this.onSuccessUsers(response);
    });
  }

  getProfile(userId: string) {
    this.apiBaseService.resetBeforeRequest({ profile: {} });
    this.httpClient.get<Profile>(`/api/users/${userId}/profiles`).subscribe(response => {
      this.onSuccessProfile(response);
    });
  }

  getFollowings() {
    this.apiBaseService.setLoading();
    this.httpClient
      .get<Profile[]>(`/api/users/${this.store.getState().profile.id}/followings`)
      .subscribe(response => {
        this.onSuccessSearchUsers(response);
      });
  }

  getFollowers() {
    this.apiBaseService.setLoading();
    this.httpClient
      .get<Profile[]>(`/api/users/${this.store.getState().profile.id}/followers`)
      .subscribe(response => {
        this.onSuccessSearchUsers(response);
      });
  }

  follow(followedId: number) {
    const body: RelationshipRequestBody = {
      relationship: {
        followedId: followedId,
      },
    };
    this.httpClient
      .post(`/api/users/${this.store.getState().account.id}/relationships`, body)
      .subscribe(response => this.onSuccessProfile(response));
  }

  unfollow(followedId: number) {
    this.httpClient
      .delete(`/api/users/${this.store.getState().account.id}/relationships/${followedId}`)
      .subscribe(response => this.onSuccessProfile(response));
  }

  searchByAllergenGroup(keyword: string) {
    this.apiBaseService.resetBeforeRequest({ searchUsers: [] });
    const params = new HttpParams().set('keyword', keyword);
    this.httpClient.get<Profile[]>(`/api/search/allergens`, { params: params }).subscribe(
      response => {
        this.onSuccessSearchUsers(response);
      },
      error => {
        this.apiBaseService.onNotFound({ searchUsers: [] });
      },
    );
  }

  searchByName(keyword: string) {
    this.apiBaseService.resetBeforeRequest({ searchUsers: [] });
    const params = new HttpParams().set('keyword', keyword);
    this.httpClient.get<Profile[]>(`/api/search/usernames`, { params: params }).subscribe(
      response => {
        this.onSuccessSearchUsers(response);
      },
      error => {
        this.apiBaseService.onNotFound({ searchUsers: [] });
      },
    );
  }

  private onSuccessUsers(data: User[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      users: data,
      loading: false,
      error: false,
    });
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
