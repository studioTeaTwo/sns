import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

import { Store } from 'app/shared/store/store';
import {
  DailyLog,
  DailyLogStrongParameter,
  DailyLogRequestBody,
} from 'app/interfaces/api-models';
import { DailyLogService } from 'app/shared/services/api';

enum MODE {
  CREATE = 1,
  EDIT = 2,
  ROM = 3,
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  MODE = MODE;
  displayMode: number;

  dailyLogParam: DailyLogStrongParameter = this.initialState;

  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;
  readonly medias: MediaStreamConstraints = {audio: false, video: {
    facingMode: 'user'
  }};
  private captureData: string;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      // 新規作成ページ
      if (url[0].path === 'create') {
        this.displayMode = MODE.CREATE;
      // 詳細ページ
      } else {
        this.displayMode = MODE.ROM;
        const result = this.store.getState().dailyLogList.find(value => value.id === +url[0].path);
        if (result) {
          this.dailyLogParam = result;
        } else {
          this.dailyLogService.get(+url[0].path).subscribe(response => this.dailyLogParam = response);
        }
      }
    });
  }

  get initialState(): DailyLogStrongParameter {
    return {
      date: moment().format('YYYY-MM-DD'),
      symptom: 'atopic',
      health: 0,
      healthMemo: '',
      medicina: undefined,
      medicinaMemo: '',
      photograph: [],
      photographMemo: '',
    }
  }

  onClickCamera() {
    window.navigator.mediaDevices.getUserMedia(this.medias)
      .then(stream => this.videoElm.nativeElement.srcObject = stream)
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  onClickPhotoDel(photo: string) {
    const result = this.dailyLogParam.photograph.indexOf(photo);
    this.dailyLogParam.photograph.splice(result, 1);
  }

  onClickEdit() {
    this.displayMode = MODE.EDIT;
  }

  onClickUpdate() {
    this.dailyLogService.update(this.dailyLogParam)
      .subscribe(
        () => {
          this.snackBar.open('変更されました！', null, {
            duration: 2000,
          });
        });
  }

  onClickSubmit() {
    this.dailyLogService.create(this.dailyLogParam)
      .subscribe(
        () => {
          this.snackBar.open('記録されました！', null, {
            duration: 2000,
          });
        });
  }

}
