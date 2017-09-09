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
  ChatViewModel,
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
  selector: 'app-step-email',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class StepEmailComponent extends ChatComponent implements OnInit, AfterViewInit {
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

    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();
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
    addChatAndFocus({
      body: tutorial_script2,
      waitTime: 1000
    }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
  }


  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onClickReply(text: string) {
    // eメール
    if (!this.chatHistory.includes(tutorial_script3[0])) {
      // FIXME: 正規表現バリデーション
      // https://blog.ohgaki.net/redos-must-review-mail-address-validation
      if (!this.emailValidator(text)) {
        addChatAndFocus({
          body: tutorial_script_error,
          waitTime: 0,
          tmp: true
        }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
        return;
      }

      this.accountService.verifyEmail(text)
        .subscribe(
          response => {
            this.toggleReplyText(false);
            this.createEmail(text);
          },
          error => {
            addChatAndFocus({
              body: tutorial_script_error_email,
              waitTime: 0,
              tmp: true
            }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
          }
        );

    // パスワード
    } else {
      // TODO: パスワードバリデーション。日本語オーケーでいいか？
      if (!this.passwordValidator(text)) {
        addChatAndFocus({
          body: tutorial_script_error,
          waitTime: 0,
          tmp: true
        }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
        return;
      }

      this.toggleReplyText(false);
      this.createPassword(text);
    }
  }

  onClickYes() {
    this.accountService.create();
    this.router.navigate(['']);
  }

  onClickNo() {
    this.scrollToTop();

    this.chatHistory = [];
    addChatAndFocus({
      body: tutorial_script1.concat(tutorial_script2),
      waitTime: 0
    }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
  }

  private createEmail(text: string) {
    this.accountService.saveSignupdataEmail(text);

    const reply: ChatViewModel[] = [{
      id: 3,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: text,
      createdAt: new Date()
    }];

    addChatAndFocus({
      body: reply.concat(tutorial_script3),
      waitTime: 1000,
    }, this.chatHistory, this.chatSource, () => this.toggleReplyText(true), this.emitClick);
  }

  private createPassword(text: string) {
    this.accountService.saveSignupdataPassword(text);

    const reply: ChatViewModel[] = [{
      id: 3,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: text,
      createdAt: new Date()
    }];

    addChat({
      body: reply.concat(tutorial_script4),
      waitTime: 0,
    }, this.chatHistory, this.chatSource);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private emailValidator(email: string): boolean {
    const mail_regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (email.match(mail_regex)) {
      return true;
    } else {
      return false;
    }
  }

  private passwordValidator(password: string): boolean {
    if (password.length && password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }
}

const tutorial_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '王国へ入場するためのパスポートを発行するよ！',
    createdAt: new Date()
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '君のメールアドレスを教えて',
    createdAt: new Date()
  },
];
const tutorial_script3: ChatViewModel[] = [{
  id: 4,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: 'パスワードはどうする？君の好きな暗号を6文字以上で設定するんだ',
  createdAt: new Date()
}];
const tutorial_script4: ChatViewModel[] = [{
  id: 5,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.YESNO,
  body: 'これでOKかい？',
  createdAt: new Date()
}];
const tutorial_script_error: ChatViewModel[] = [{
  id: 6,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: '入力が正しく無いよ。もう一回入力してみて！',
  createdAt: new Date()
}];
const tutorial_script_error_email: ChatViewModel[] = [{
  id: 7,
  senderId: NAVI_CHARA.id,
  contentType: CONTENT_TYPE.REPLY,
  body: 'もうこのアドレスは登録されてるってさ！',
  createdAt: new Date()
}];
