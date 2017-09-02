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
  selector: 'app-step-symptom',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class StepSymptomComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') input: ElementRef;
  chatSource: Subject<Chat[]>;
  chatHistory: Chat[] = [];

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

    setTimeout(() => this.chatSource.next(this.chatHistory), 0);
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onChangeChecked(item) {
    const mySymptom = this.accountService.saveSignupdataSymptom(item);
    this.createReply(mySymptom);
  }

  onClickYes() {
    // 次のステップへ
    this.completed.emit(3);
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
    if (body.length === 0) { body = '特に無い。'; }

    const reply: Chat[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date()
    }];
    this.chatSource.next(this.chatHistory.concat(reply, tutorial_script2));
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    tutorial_script1[0].itemList.forEach(value => value.checked = false);
    tutorial_script1[0].expired = false;
    this.accountService.saveSignupdataSymptom(null);

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1);
  }
}

const tutorial_script1: Chat[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.CHECKBOX,
    body: '君はどんな症状を持っているんだい？',
    itemList: [
      {
        id: 'atopic',
        name: 'アトピー',
        checked: false,
      },
      {
        id: '',
        name: '喘息',
        checked: false,
      },
      {
        id: '',
        name: '花粉症',
        checked: false,
      },
      {
        id: '',
        name: '鼻炎',
        checked: false,
      },
      {
        id: '',
        name: '胃腸炎',
        checked: false,
      },
      {
        id: '',
        name: '結膜炎',
        checked: false,
      },
    ],
    createdAt: new Date()
  },
];
const tutorial_script2: Chat[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかい？',
    createdAt: new Date()
  },
];
