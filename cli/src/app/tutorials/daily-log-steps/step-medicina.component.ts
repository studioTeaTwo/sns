import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/core/store/store';
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
} from 'app/core/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/life-logs/daily-logs/logging/logging.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

enum STEP {
  MEDICINA_YESNO,
  MEMO_YESNO,
}

@Component({
  selector: 'app-step-medicina',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class StepMedicinaComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') inputElm: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

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
    this.height = window.innerHeight - 42 - 50; // 42 = header.height 50 = footer.height

    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    this.accountService.get().subscribe(response => this.myself = response);
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    this.step = STEP.MEDICINA_YESNO;
    addChat({
      body: daily_log_script1,
      waitTime: 0,
      tmp: true,
    }, this.chatHistory, this.chatSource);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  onClickYes() {
    switch (this.step) {
      case STEP.MEDICINA_YESNO:
        this.dailyLogService.saveMedicina(true);

        this.step = STEP.MEMO_YESNO;
        addChat({
          body: daily_log_script2,
          waitTime: 0
        }, this.chatHistory, this.chatSource);
        break;

      case STEP.MEMO_YESNO:
        this.toggleReplyText(true);
        break;
    }
  }

  onClickNo() {
    switch (this.step) {
      case STEP.MEDICINA_YESNO:
        this.dailyLogService.saveMedicina(false);

        this.step = STEP.MEMO_YESNO;
        addChat({
          body: daily_log_script2,
          waitTime: 0
        }, this.chatHistory, this.chatSource);
        break;

      case STEP.MEMO_YESNO:
        // 次のステップへ
        this.completed.emit(DisplayState.PICTURE);
        break;
    }

  }

  onClickReply(text: string) {
    this.dailyLogService.saveMedicinaMemo(text);
    // 次のステップへ
    this.completed.emit(DisplayState.PICTURE);
  }

}

const daily_log_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: '薬はちゃんと服用した？',
    createdAt: new Date().toString()
  },
];
const daily_log_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'そうなんだ！何かメモしておく？（後でもできるよ）',
    createdAt: new Date().toString()
  },
];
