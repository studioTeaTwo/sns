import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA } from 'app/constants/constants';
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
import { DisplayState } from 'app/components/life-logs/daily-logs/logging/logging.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-health',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class StepHealthComponent extends ChatComponent implements OnInit {
  @ViewChild('replyText') inputElm: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  @Output() completed = new EventEmitter();

  private selectedResult: number;
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

    // TODO: アンケートの初期化をもうちょいちゃんとやる
    daily_log_script2[0].result = '';

    addChat({
      body: daily_log_script1,
      waitTime: 0
    }, this.chatHistory, this.chatSource);
    addChat({
      body: daily_log_script2,
      waitTime: 1000
    }, this.chatHistory, this.chatSource);
  }

  onChangeRadio(item: any) {
    this.selectedResult = item.id;
    daily_log_script2[0].result = item.name;
    this.dailyLogService.saveHealth(item);

    this.createReply(item);
  }

  onClickYes() {
    this.toggleReplyText(true);
  }

  onClickNo() {
    // 次のステップへ
    this.completed.emit(DisplayState.PICTURE);
  }

  onClickReply(text: string) {
    this.dailyLogService.saveHealthMemo(text);
    // 次のステップへ
    this.completed.emit(DisplayState.PICTURE);
  }

  private createReply(result: any) {
    const body = result.name + 'です。<br/>';
    const reply: ChatViewModel[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date().toString()
    }];

    addChat({
      body: reply.concat(daily_log_script３),
      waitTime: 0,
      tmp: true
    }, this.chatHistory, this.chatSource);
    setTimeout(() => this.scrollToBottom(), 0);
  }
}

const daily_log_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '今日の調子はどうだった？',
    createdAt: new Date().toString()
  },
];
const daily_log_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.RADIOBUTTON,
    body: 'さあ記録しよう！まずは気分を聞かせて',
    itemList: [
      {
        id: 1,
        name: '😄',
      },
      {
        id: 2,
        name: '☺️',
      },
      {
        id: 3,
        name: '😥',
      },
    ],
    result: '',
    createdAt: new Date().toString()
  },
];
const daily_log_script３: ChatViewModel[] = [
  {
    id: 3,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'そうなんだ！何かメモしておく？（後でもできるよ）',
    createdAt: new Date().toString()
  },
];
