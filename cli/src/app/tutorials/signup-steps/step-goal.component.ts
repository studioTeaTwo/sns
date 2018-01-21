import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
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
} from 'app/shared/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/auth/signup/signup.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-goal',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class StepGoalComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') inputElm: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  @Output() completed = new EventEmitter();

  private emitClick = () => setTimeout(() => this.inputElm.nativeElement.click(), 0);

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
  }

  ngOnInit() {
    this.myself = SIGNUP_USER;
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    addChat({
      body: tutorial_script1,
      waitTime: 0,
    }, this.chatHistory, this.chatSource);
    addChat({
      body: tutorial_script2,
      waitTime: 2000
    }, this.chatHistory, this.chatSource);
    addChat({
      body: tutorial_script3,
      waitTime: 5000
    }, this.chatHistory, this.chatSource);
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onClickYes() {
    this.completed.emit(DisplayState.BACK);
  }

}

const tutorial_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'OK！君の入国を許可するよ！',
    createdAt: new Date().toString()
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'お家を用意したのでまずはそこへ向かってみて。',
    createdAt: new Date().toString()
  },
  {
    id: 3,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    // TODO: マークアップを反映する
    body: `家には<span color="Red">郵便物が来たりマニュアルがある</span>から、何をしたらいいかヒントがあるはずさ。`,
    createdAt: new Date().toString()
  },
];
const tutorial_script3: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'さあ準備ができたらYESを押してくれ。僕もそっちへ向かう。',
    createdAt: new Date().toString()
  },
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'そこで君のことを待ってるよ！',
    createdAt: new Date().toString()
  },
];
