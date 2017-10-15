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

  create(body?: DailyLogRequestBody) {
    if (!body) {
      body = {
        daily_log: this.dailyLogParam,
      }
    }
    this.httpClient.post<DailyLog>(`/api/daily_logs`, body)
      .subscribe(
        response => {
          this.onSuccessLog(response);
          this.dailyLogParam = this.initialState;
        }
      );

    // TODO: multi-partで送るなら
    if (this.dailyLogParam.photograph && this.dailyLogParam.photograph.length > 0) {
      const fileData: FormData = new FormData();
      fileData.append('imageFile', this.Base64ToImage(this.dailyLogParam.photograph));
    }
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

  savePhotograph(data: string) {
    this.dailyLogParam.photograph = data;
  }

  savePhotographMemo(text: string) {
    this.dailyLogParam.photographMemo = text;
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

  private Base64ToImage(uploadFile: string) {
    const bin = atob(uploadFile.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([buffer.buffer], {
        type: 'png'
    });
    return blob;
  }

}
