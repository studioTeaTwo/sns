import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA, SIGNUP_USER, SIGNUP_THREAD } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  Chat,
  CONTENT_TYPE,
  User,
} from 'app/interfaces/api-models';
import {
  AccountService,
  ChatService,
} from 'app/shared/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { addChat, addChatAndFocus } from '../../shared/chat-operation.function';

@Component({
  selector: 'app-step-type',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class StepTypeComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') input: ElementRef;
  chatSource: Subject<Chat[]>;
  chatHistory: Chat[] = [];

  private selectedResult: number;

  @Output() completed = new EventEmitter();

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    chatService: ChatService,
    private sanitizer: DomSanitizer,
    private accountService: AccountService,
  ) {
    super(
      router,
      route,
      renderer,
      store,
      chatService,
    );
    this.height = window.innerHeight;

    this.chatSource = new Subject<Chat[]>();
    this.chats$ = this.chatSource.asObservable();

    this.resetData();
  }

  ngOnInit() {
    this.myself = SIGNUP_USER;
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = SIGNUP_THREAD;

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
      this.completed.emit(2);
    } else {
      this.completed.emit(3);
    }
  }

  onClickNo() {
    this.scrollToTop();

    this.reset();
    this.chatSource.next(this.chatHistory);
  }

  private createReply(result) {
    const body = result.name + 'です。<br/>';
    const reply: Chat[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date()
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

const tutorial_script1: Chat[] = [{
  id: 1,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: 'ここはアレルギー王国',
  createdAt: new Date()
}];
const tutorial_script2: Chat[] = [
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
    createdAt: new Date()
  },
];
const tutorial_script3: Chat[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかい？',
    createdAt: new Date()
  },
];
