import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-step2',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class Step2Component extends ChatComponent implements OnInit {
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
    this.height = window.innerHeight - (56 + 50);

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

  onChangeChecked(item) {
    const mySymptom = this.accountService.saveSignupdataSymptom(item);
    this.createReply(mySymptom);
  }

  onChangeRadio(item) {
    // 症状データはリセット
    tutorial_script2[0].itemList.forEach(value => value.checked = false);
    tutorial_script2[0].expired = true;

    tutorial_script2[1].result = item.name;
    this.accountService.saveSignupdataUserType(item);

    const reply = {};
    reply[item.name] = 'dummy';
    this.createReply(reply);
  }

  onClickYes() {
    this.completed.emit(2);
  }

  onClickNo() {
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
    this.chatSource.next(this.chatHistory.concat(reply, tutorial_script3));
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    tutorial_script2[0].itemList.forEach(value => value.checked = false);
    tutorial_script2[0].expired = false;
    tutorial_script2[1].result = '';

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
    contentType: CONTENT_TYPE.CHECKBOX,
    body: '君はどんな症状を持っているんだい？',
    itemList: [
      {
        name: 'アトピー',
        checked: false,
      },
      {
        name: '喘息',
        checked: false,
      },
      {
        name: '花粉症',
        checked: false,
      },
      {
        name: '鼻炎',
        checked: false,
      },
      {
        name: '胃腸炎',
        checked: false,
      },
      {
        name: '結膜炎',
        checked: false,
      },
    ],
    createdAt: new Date()
  },
  {
    id: 3,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.RADIOBUTTON,
    body: 'それとも患者以外かい？（こちらをチェックすると治療データを入力できません）',
    itemList: [
      {
        name: '患者の家族',
      },
      {
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
