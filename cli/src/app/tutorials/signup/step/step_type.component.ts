import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA, SIGNUP_THREAD } from 'app/constants/constants';
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
  }

  ngOnInit() {
    this.myself = this.store.getState().account;
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = SIGNUP_THREAD;
    this.chatHistory.push(...tutorial_script1);

    setTimeout(() => this.chatSource.next(this.chatHistory), 0)
    setTimeout(() => {
      this.chatHistory.push(...tutorial_script2);
      this.chatSource.next(this.chatHistory);
    }, 2000);
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onChangeRadio(item) {
    this.selectedResult = item.id;
    tutorial_script2[0].result = item.name;
    this.accountService.saveSignupdataClassification(item);

    const reply = {};
    reply[item.name] = 'dummy';
    this.createReply(reply);
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
    let body = '';
    Object.keys(result).forEach(value => {
      if (!result[value]) { return; }
      body += value + 'です。<br/>';
    });

    const reply: Chat[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date()
    }];
    this.chatSource.next(this.chatHistory.concat(reply, tutorial_script3));
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    tutorial_script2[0].result = '';
    this.accountService.saveSignupdataClassification(null);

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1, ...tutorial_script2);
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
