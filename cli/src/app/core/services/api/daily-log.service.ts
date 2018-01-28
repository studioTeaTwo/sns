import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { Store } from 'app/core/store/store';
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

  dailyLogParam: DailyLogStrongParameter = this.initialState;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  get initialState(): DailyLogStrongParameter {
    return {
      date: moment().format('YYYY-MM-DD'),
      symptom: '',
      health: 0,
      healthMemo: '',
      medicina: undefined,
      medicinaMemo: '',
      photograph: [],
      photographMemo: '',
    };
  }

  list() {
    this.httpClient.get<DailyLog[]>(`/api/daily_logs`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  get(id: number): Observable<DailyLog> {
    return this.httpClient.get<DailyLog>(`/api/daily_logs/${id}`)
      .map(
        response => {
          this.onSuccessLog(response);
          return response;
        }
      );
  }

  create(param?: DailyLogStrongParameter): Observable<void> {
    const body: DailyLogRequestBody = {
      daily_log: param ? param : this.dailyLogParam,
    };

    // TODO: multi-partで送るなら
    if (this.dailyLogParam.photograph && this.dailyLogParam.photograph.length > 0) {
      const fileData: FormData = new FormData();
      this.dailyLogParam.photograph.forEach(photo => fileData.append('imageFile', this.Base64ToImage(photo)));
    }

    return this.httpClient.post<DailyLog>(`/api/daily_logs`, body)
      .map(
        response => {
          this.onSuccessLog(response);
          this.dailyLogParam = this.initialState;
        }
      );
  }

  update(param: DailyLogStrongParameter): Observable<void> {
    const body: DailyLogRequestBody = {
      daily_log: param,
    };
    return this.httpClient.put<DailyLog>(`/api/daily_logs/${param.id}`, body)
      .map(
        response => {
          this.onSuccessLog(response);
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
    this.dailyLogParam.health = item.id;
  }

  saveHealthMemo(text: string) {
    this.dailyLogParam.healthMemo = text;
  }

  saveMedicina(item: boolean) {
    this.dailyLogParam.medicina = item;
  }

  saveMedicinaMemo(text: string) {
    this.dailyLogParam.medicinaMemo = text;
  }

  savePhotograph(data: string) {
    this.dailyLogParam.photograph.push(data);
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

  private Base64ToImage(uploadFile: string): Blob {
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
