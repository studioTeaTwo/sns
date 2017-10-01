import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  daily_log: DailyLogStrongParameter = {
    symptom: 0,
    health: 0,
    healthMemo: '',
    medicina: false,
    medicinaMemo: '',
    photograph: '',
    photographMemo: '',
  };

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  list() {
    this.httpClient.get<DailyLog[]>(`/api/daily_logs`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  create(body: DailyLogRequestBody): Observable<DailyLog> {
    return this.httpClient.post<DailyLog>(`/api/daily_logs`, body)
      .map(
        response => {
          this.onSuccessLog(response);
          return response
        }
      );
  }

  saveHealth(item: any) {
    this.daily_log.health = item.id
  }

  saveHealthMemo(text: string) {
    this.daily_log.healthMemo = text;
  }

  private onSuccessList(data: DailyLog[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      dailyLogs: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessLog(data: DailyLog) {
    const currentState = this.store.getState();
    let newState: DailyLog[];
    newState = unique(currentState.dailyLogs.concat(data)).sort((a, b) => compareUpdated<DailyLog>(a, b));
    console.log('新しいDailyLog', newState);
    this.store.setState({
      ...currentState,
      dailyLogs: newState,
      loading: false,
      error: false,
    });
  }

}
