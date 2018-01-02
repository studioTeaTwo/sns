import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StoreState } from './store-state.interface';

const initialState = {
    // APIデータ
    account: {} as any,
    profile: {} as any,
    notificationList: [],
    experienceList: {} as any,
    chatList: [],
    chats: [],
    searchUsers: [],
    dailyLogList: [],
    dailyLog: {},

    masterAllergenGroups: [],

    // 画面状態
    loading: false,
    error: false,
    errorMsg: '',
};

const store = new BehaviorSubject<StoreState>(initialState);

@Injectable()
export class Store {
  private store = store;
  changes = store.asObservable().distinctUntilChanged();

  getState(): StoreState {
    return this.store.value;
  }

  setState(state: StoreState) {
    this.store.next(state);
  }
}
