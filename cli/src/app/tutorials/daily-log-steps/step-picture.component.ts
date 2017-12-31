import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA, NAVI_THREAD } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  ChatViewModel,
  CONTENT_TYPE,
  User,
  DailyLogRequestBody,
} from 'app/interfaces/api-models';
import {
  AccountService,
  ChatService,
  DailyLogService,
} from 'app/shared/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { addChat, addChatAndFocus } from '../shared/chat-operation.function';

enum STEP {
  CAMERA_YESNO,
  CAMERA_ON,
  PICTURE_YESNO,
  PICTUREMEMO_YESNO,
}

@Component({
  selector: 'app-step-picture',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class StepPictureComponent extends ChatComponent implements OnInit {
  @ViewChild('replyText') inputElm: ElementRef;
  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  readonly medias: MediaStreamConstraints = {audio: false, video: {
    // facingMode: {
    //   exact : 'environment'
    // }
    facingMode: 'user'
  }};
  private captureData: string;

  @Output() completed = new EventEmitter();

  private step: number;
  private emitClick = () => setTimeout(() => this.inputElm.nativeElement.click(), 0);

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    accountService: AccountService,
    chatService: ChatService,
    private sanitizer: DomSanitizer,
    private dailyLogService: DailyLogService,
  ) {
    super(
      router,
      route,
      renderer,
      store,
      accountService,
      chatService,
    );
    this.height = window.innerHeight;

    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    this.accountService.get().subscribe(response => this.myself = response);
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    addChat({
      body: daily_log_script1,
      waitTime: 0,
      tmp: true,
    }, this.chatHistory, this.chatSource);

    this.step = STEP.CAMERA_YESNO;
  }

  onClickYes() {
    switch (this.step) {
      case STEP.CAMERA_YESNO:
        // カメラを起動
        this.startCamera();
        this.step = STEP.CAMERA_ON;
        break;

      case STEP.CAMERA_ON:
        // 写真の確認
        addChat(
          {
            body: [daily_log_script2[0], ...daily_log_script3],
            waitTime: 0,
          }, this.chatHistory = [], this.chatSource,
          () => {
            this.captureData = this.draw();
            this.pauseCamera();
            return true;
          }
        );

        this.step = STEP.PICTURE_YESNO;
        break;

      case STEP.PICTURE_YESNO:
        // 写真へのコメント
        this.dailyLogService.savePhotograph(this.captureData);
        this.localSave();

        addChat({
          body: [daily_log_script2[0], ...daily_log_script4],
          waitTime: 0,
        }, this.chatHistory = [], this.chatSource);

        this.step = STEP.PICTUREMEMO_YESNO;
        break;

      case STEP.PICTUREMEMO_YESNO:
        // テキストボックス表示
        addChatAndFocus(
          {
            body: [daily_log_script2[0]],
            waitTime: 0,
          }, this.chatHistory, this.chatSource,
          () => this.toggleReplyText(true), this.emitClick
        );
        break;
    }
  }

  onClickNo() {
    switch (this.step) {
      case STEP.CAMERA_YESNO:
      case STEP.PICTUREMEMO_YESNO:
        // 次のステップへ
        this.end();
        break;

      case STEP.CAMERA_ON:
        // 初めに戻る
        addChat({
          body: daily_log_script1,
          waitTime: 0,
          tmp: true,
        }, this.chatHistory = [], this.chatSource);

        this.step = STEP.CAMERA_YESNO;
        break;

      case STEP.PICTURE_YESNO:
        // 写真の取り直し
        this.chatHistory = [];
        this.startCamera();

        this.step = STEP.CAMERA_ON;
        break;
    }
  }

  onClickReply(replyText: string) {
    this.toggleReplyText(false);

    this.dailyLogService.savePhotographMemo(replyText);

    this.end();
  }

  private draw(): string {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;

    const ctx = this.canvasElm.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasElm.nativeElement.width  = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    return this.canvasElm.nativeElement.toDataURL(ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT));
  }

  private startCamera() {
    addChat({
      body: daily_log_script2,
      waitTime: 0,
    }, this.chatHistory, this.chatSource);

    window.navigator.mediaDevices.getUserMedia(this.medias)
      .then(stream => this.videoElm.nativeElement.srcObject = stream)
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  private pauseCamera() {
    this.videoElm.nativeElement.pause();
  }

  private stopCamera() {
    if (!this.videoElm) {
      return;
    }
    const track = this.videoElm.nativeElement.srcObject.getTracks()[0] as MediaStreamTrack;
    track.stop();
  }

  private end() {
    this.stopCamera();

    addChat({
      body: daily_log_script5,
      waitTime: 0,
    }, this.chatHistory = [], this.chatSource);

    // データ送信
    this.dailyLogService.create().subscribe();
    // 次のステップへ
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  private localSave() {
    const a = this.renderer.createElement('a') as HTMLAnchorElement;
    a.href = this.captureData;
    a.setAttribute('download', 'image.png');
    // TODO: ローカル保存を実行する何か
    // a.click();
  }
}

const daily_log_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: '写真で記録する？',
    createdAt: new Date().toString()
  },
];
const daily_log_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.CAMERA,
    body: '',
    createdAt: new Date().toString()
  },
  {
    id: 3,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: '写真にしたい時に「はい」を押してね',
    createdAt: new Date().toString()
  },
];
const daily_log_script3: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかな？',
    createdAt: new Date().toString()
  },
];
const daily_log_script4: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: '何か写真にコメントしておく？',
    createdAt: new Date().toString()
  },
];
const daily_log_script5: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'おつかれさま！',
    createdAt: new Date().toString()
  },
];
