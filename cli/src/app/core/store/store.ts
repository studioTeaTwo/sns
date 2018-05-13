import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { StoreState } from './store-state.interface';

type Select<T, R> = (state: T) => R;

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

  // 開発用メニュー
  users: [],
};

// ここに置かないと同一ストリーム内で何度も変える時（loadingなど）にdistinctUntilChanged()が効かなくなる
const store = new BehaviorSubject<StoreState>(initialState);

@Injectable()
export class Store {
  private store = store;

  select<T>(fn: Select<StoreState, T>): Observable<T> {
    return store.pipe(map(fn), distinctUntilChanged());
  }

  getState(): StoreState {
    return this.store.value;
  }

  setState(state: StoreState) {
    this.store.next(state);
  }
}
