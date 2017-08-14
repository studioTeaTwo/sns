import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StoreState } from './store-state.interface';

const initialState = {
    // APIデータ
    account: {},
    profile: {},
    searchUsers: {},

    // 画面状態
    loading: false,
    error: false,
};

const store = new BehaviorSubject<StoreState>(initialState);

@Injectable()
export class Store {
  store = store;
  changes = store.asObservable().distinctUntilChanged();

  getState() {
    return this.store.value;
  }

  setState(state: StoreState) {
    this.store.next(state);
  }
}