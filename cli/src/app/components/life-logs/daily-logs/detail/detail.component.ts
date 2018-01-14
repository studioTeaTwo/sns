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
  User,
} from 'app/interfaces/api-models';
import { SymptomName, Symptom } from 'app/constants/constants';
import { AccountService, DailyLogService } from 'app/shared/services/api';

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
  uploadOpen = false;
  inputFiles: any;

  user: User;
  isMultipleSymptom = true;
  dailyLogParam: DailyLogStrongParameter = this.initialState;
  readonly SymptomName = SymptomName;

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
    private accountService: AccountService,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.accountService.get().subscribe(user => {
      this.user = user;
      this.judgeMultipleSymptom(user);
    });

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
      symptom: '',
      health: 0,
      healthMemo: '',
      medicina: undefined,
      medicinaMemo: '',
      photograph: [],
      photographMemo: '',
    };
  }

  onClickEdit() {
    this.displayMode = MODE.EDIT;
  }

  onClickUpdate() {
    this.dailyLogService.update(this.dailyLogParam)
      .subscribe(
        () => {
          this.displayMode = MODE.ROM;
          this.snackBar.open('修正しました！', null, {
            duration: 2000,
          });
        });
  }

  onClickCreate() {
    this.dailyLogService.create(this.dailyLogParam)
      .subscribe(
        () => {
          this.snackBar.open('記録しました！', null, {
            duration: 2000,
          });
        });
  }

  onClickCamera() {
    window.navigator.mediaDevices.getUserMedia(this.medias)
      .then(stream => this.videoElm.nativeElement.srcObject = stream)
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  onChangeFile(input: any) {
    this.uploadOpen = true;
    this.inputFiles = input.files;
  }

  onClickPhotoDel(photo: string) {
    const result = this.dailyLogParam.photograph.indexOf(photo);
    this.dailyLogParam.photograph.splice(result, 1);
  }

  getImage(file: any) {
    this.uploadOpen = false;
    this.dailyLogParam.photograph.push(file);
  }

  private judgeMultipleSymptom(user: User) {
    const symptomList: Symptom[] = [];
    if (user.atopic) { symptomList.push('atopic'); }
    if (user.asthma) { symptomList.push('asthma'); }
    if (user.rhinitis) { symptomList.push('rhinitis'); }
    if (user.pollen) { symptomList.push('pollen'); }
    if (user.gastroenteritis) { symptomList.push('gastroenteritis'); }
    if (user.conjunctivitis) { symptomList.push('conjunctivitis'); }

    // trueが一つだけならsingle。2つ以上と0個はmultiple扱い。0個は任意で指定させる必要があるため。
    if (symptomList.length === 1) {
      this.isMultipleSymptom = false;
      this.dailyLogParam.symptom = symptomList[0];
    }
  }

}
