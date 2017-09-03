import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-step-name',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class StepNameComponent extends ChatComponent implements OnInit {
  @ViewChild('replyText') inputElm: ElementRef;
  chatSource: Subject<Chat[]>;
  chatHistory: Chat[] = [];

  @Output() completed = new EventEmitter();

  private emitClick = () => setTimeout(() => this.inputElm.nativeElement.click(), 0);

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    chatService: ChatService,
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

    this.showReplyText = false;
    this.chatSource = new Subject<Chat[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    this.myself = SIGNUP_USER;
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = SIGNUP_THREAD;

    addChat({
      body: tutorial_script1,
      waitTime: 0
    }, this.chatHistory, this.chatSource);
    addChatAndFocus({
      body: tutorial_script2,
      waitTime: 2000
    }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
  }

  onClickReply(text) {
    this.toggleReplyText(false);
    this.accountService.saveSignupdataName(text);

    const reply: Chat[] = [{
      id: 3,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: text,
      createdAt: new Date()
    }];
    addChat({
      body: reply,
      waitTime: 0
    }, this.chatHistory, this.chatSource);

    tutorial_script3[0].body = `すごい！${text}って言うんだ！`;
    addChat({
      body: tutorial_script3,
      waitTime: 1000
    }, this.chatHistory, this.chatSource,
      // 次のステップへ
      () => setTimeout(() => this.completed.emit(1), 2000)
    );
  }
}

const tutorial_script1: Chat[] = [{
  id: 1,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: 'ようこそ！',
  createdAt: new Date()
}];
const tutorial_script2: Chat[] = [{
  id: 2,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: '君の名前を教えて！',
  createdAt: new Date()
}];
const tutorial_script3: Chat[] = [{
  id: 4,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: '',
  createdAt: new Date()
}];
