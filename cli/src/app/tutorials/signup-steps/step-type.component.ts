import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/core/store/store';
import { NAVI_CHARA, SIGNUP_USER } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  ChatViewModel,
  CONTENT_TYPE,
  User,
} from 'app/interfaces/api-models';
import {
  AccountService,
  ChatService,
} from 'app/core/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/auth/signup/signup.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-type',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class StepTypeComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') input: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  @Output() completed = new EventEmitter();

  private selectedResult: number;

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    accountService: AccountService,
    chatService: ChatService,
    private sanitizer: DomSanitizer,
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

    this.resetData();
  }

  ngOnInit() {
    this.myself = SIGNUP_USER;
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    addChat({
      body: tutorial_script1,
      waitTime: 0
    }, this.chatHistory, this.chatSource);
    addChat({
      body: tutorial_script2,
      waitTime: 2000
    }, this.chatHistory, this.chatSource);
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onChangeRadio(item) {
    this.selectedResult = item.id;
    tutorial_script2[0].result = item.name;
    this.accountService.saveSignupdataClassification(item);

    this.createReply(item);
  }

  onClickYes() {
    // 次のステップへ
    if (this.selectedResult === 1 || this.selectedResult === 2) {
      this.completed.emit(DisplayState.SYMPTOM);
    } else {
      this.completed.emit(DisplayState.EMAIL);
    }
  }

  onClickNo() {
    this.scrollToTop();

    this.reset();
    this.chatSource.next(this.chatHistory);
  }

  private createReply(result) {
    const body = result.name + 'です。<br/>';
    const reply: ChatViewModel[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date().toString()
    }];

    addChat({
      body: reply.concat(tutorial_script3),
      waitTime: 0,
      tmp: true
    }, this.chatHistory, this.chatSource);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    this.resetData();

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1, ...tutorial_script2);
  }

  private resetData() {
    tutorial_script2[0].result = '';
    this.accountService.saveSignupdataClassification(null);
  }
}

const tutorial_script1: ChatViewModel[] = [{
  id: 1,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: 'ここはアレルギー王国',
  createdAt: new Date().toString()
}];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.RADIOBUTTON,
    body: '君はアレルギーの症状を持っているかい？それともアレルギーに関心ある人かな？',
    itemList: [
      {
        id: 1,
        name: '患者',
      },
      {
        id: 2,
        name: '元患者',
      },
      {
        id: 3,
        name: '患者の家族',
      },
      {
        id: 4,
        name: '医療関係者',
      },
    ],
    result: '',
    createdAt: new Date().toString()
  },
];
const tutorial_script3: ChatViewModel[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかい？',
    createdAt: new Date().toString()
  },
];
