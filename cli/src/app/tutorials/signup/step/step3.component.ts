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
  selector: 'app-step3',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class Step3Component extends ChatComponent implements OnInit, AfterViewInit {
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
    setTimeout(() => {
      this.chatHistory.push(...tutorial_script2);
      this.chatSource.next(this.chatHistory);
      this.toggleReplyText(true);
      setTimeout(() => this.input.nativeElement.click(), 0);
    }, 2000);
  }

  ngAfterViewInit() {
    this.scrollToTop();
  }

  onClickReply(text) {
    this.toggleReplyText(false);

    !this.chatHistory.includes(tutorial_script3[0]) ? this.createEmail(text) : this.createPassword(text);
  }

  onClickYes() {
    this.router.navigate(['']);
    // this.completed.emit();
    // this.accountService.create();
  }

  onClickNo() {
    this.scrollToTop();

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1, ...tutorial_script2);
    this.chatSource.next(this.chatHistory);

    this.toggleReplyText(true);
    setTimeout(() => this.input.nativeElement.click(), 0);
  }

  private createEmail(text: string) {
    this.accountService.saveSignupdataEmail(text);

    const reply: Chat[] = [{
      id: 3,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: text,
      createdAt: new Date()
    }];
    this.chatHistory.push(...reply);
    this.chatSource.next(this.chatHistory);

    const body = `パスワードはどうする？君の好きな暗号を設定するんだ`;
    tutorial_script3[0].body = body;
    setTimeout(() => {
      this.chatHistory.push(...tutorial_script3);
      this.chatSource.next(this.chatHistory);
      this.toggleReplyText(true);
      setTimeout(() => this.input.nativeElement.click(), 0);
    }, 1000);
  }

  private createPassword(text: string) {
    this.accountService.saveSignupdataPassword(text);

    const reply: Chat[] = [{
      id: 3,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: text,
      createdAt: new Date()
    }];
    this.chatHistory.push(...reply, ...tutorial_script4);
    this.chatSource.next(this.chatHistory);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private toggleReplyText(checked: boolean) {
    this.showReplyText = checked;
    if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
      this.isActive = checked;
    }
  }
}

const tutorial_script1: Chat[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '王国へ入場するためのパスポートを発行するよ！',
    createdAt: new Date()
  },
];
const tutorial_script2: Chat[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '君のメールアドレスを教えて',
    createdAt: new Date()
  },
];
const tutorial_script3: Chat[] = [{
  id: 4,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: '',
  createdAt: new Date()
}];
const tutorial_script4: Chat[] = [{
  id: 4,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.YESNO,
  body: 'これでOKかい？',
  createdAt: new Date()
}];
