import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import {
  compareCreated,
  compareUpdated,
  unique
} from 'app/shared/functions/array-util.function';
import {
  DailyLog,
  DailyLogRequestBody,
  DailyLogStrongParameter,
} from 'app/interfaces/api-models';

@Injectable()
export class DailyLogService {

  private dailyLogParam: DailyLogStrongParameter = this.initialState;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  get initialState(): DailyLogStrongParameter {
    return {
      symptom: 'atopic',
      health: 0,
      healthMemo: '',
      medicina: false,
      medicinaMemo: '',
      photograph: '',
      photographMemo: '',
    }
  }

  list() {
    this.httpClient.get<DailyLog[]>(`/api/daily_logs`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  create(body?: DailyLogRequestBody): Observable<DailyLog> {
    if (!body) {
      body = {
        daily_log: this.dailyLogParam,
      }
    }
    return this.httpClient.post<DailyLog>(`/api/daily_logs`, body)
      .map(
        response => {
          this.onSuccessLog(response);
          this.dailyLogParam = this.initialState;
          return response
        }
      );
  }

  storeData(dailyLog: DailyLog) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      dailyLog: dailyLog,
    });
  }

  saveHealth(item: any) {
    this.dailyLogParam.health = item.id
  }

  saveHealthMemo(text: string) {
    this.dailyLogParam.healthMemo = text;
  }

  private onSuccessList(data: DailyLog[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      dailyLogList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessLog(data: DailyLog) {
    const currentState = this.store.getState();
    let newState: DailyLog[];
    newState = unique(currentState.dailyLogList.concat(data)).sort((a, b) => compareUpdated<DailyLog>(a, b));
    console.log('新しいDailyLog', newState);
    this.store.setState({
      ...currentState,
      dailyLogList: newState,
      loading: false,
      error: false,
    });
  }

}
