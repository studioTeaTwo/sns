import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable, Subject } from 'rxjs';

import { Store } from 'app/core/store/store';
import { NAVI_CHARA, SIGNUP_USER } from 'app/constants/constants';
import { ChatThread, Chats, ChatViewModel, CONTENT_TYPE, User } from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/core/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/auth/signup/signup.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-email',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []), // ダミー
  ],
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
    accountService: AccountService,
    chatService: ChatService,
    private sanitizer: DomSanitizer,
  ) {
    super(router, route, renderer, store, accountService, chatService);
    this.height = window.innerHeight - 42 - 50; // 42 = header.height 50 = footer.height

    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    ga('send', 'event', 'Signup', 'email');

    this.myself = SIGNUP_USER;
    this.opponents = [{ ...NAVI_CHARA }];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    addChat(
      {
        body: tutorial_script1,
        waitTime: 0,
      },
      this.chatHistory,
      this.chatSource,
    );
    addChatAndFocus(
      {
        body: tutorial_script2,
        waitTime: 1000,
      },
      this.chatHistory,
      this.chatSource,
      () => this.toggleReplyText(true),
      this.emitClick,
    );
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  onClickReply(text: string) {
    // eメール
    if (!this.chatHistory.includes(tutorial_script3[0])) {
      if (!this.accountService.emailValidator(text)) {
        addChatAndFocus(
          {
            body: tutorial_script_error,
            waitTime: 0,
            tmp: true,
          },
          this.chatHistory,
          this.chatSource,
          () => this.toggleReplyText(true),
          this.emitClick,
        );
        return;
      }

      this.accountService.verifyEmail(text).subscribe(
        response => {
          this.toggleReplyText(false);
          this.createEmail(text);
        },
        error => {
          addChatAndFocus(
            {
              body: tutorial_script_error_email,
              waitTime: 0,
              tmp: true,
            },
            this.chatHistory,
            this.chatSource,
            () => this.toggleReplyText(true),
            this.emitClick,
          );
        },
      );

      // パスワード
    } else {
      // TODO: パスワードバリデーション。日本語オーケーでいいか？
      if (!this.accountService.passwordValidator(text)) {
        addChatAndFocus(
          {
            body: tutorial_script_error,
            waitTime: 0,
            tmp: true,
          },
          this.chatHistory,
          this.chatSource,
          () => this.toggleReplyText(true),
          this.emitClick,
        );
        return;
      }

      this.toggleReplyText(false);
      this.createPassword(text);
    }
  }

  onClickYes() {
    this.accountService.create().subscribe(
      () => {
        setTimeout(() => this.completed.emit(DisplayState.GOAL), 1000);
      },
      error => {
        addChat(
          {
            body: tutorial_script_error_regist,
            waitTime: 0,
          },
          this.chatHistory,
          this.chatSource,
        );
      },
    );
  }

  onClickNo() {
    this.scrollToTop();

    this.chatHistory = [];
    addChatAndFocus(
      {
        body: tutorial_script1.concat(tutorial_script2),
        waitTime: 0,
      },
      this.chatHistory,
      this.chatSource,
      () => this.toggleReplyText(true),
      this.emitClick,
    );
  }

  private createEmail(text: string) {
    this.accountService.saveSignupdataEmail(text);

    const reply: ChatViewModel[] = [
      {
        id: 3,
        senderId: this.myself.id,
        contentType: CONTENT_TYPE.REPLY,
        body: text,
        createdAt: new Date().toString(),
      },
    ];

    addChatAndFocus(
      {
        body: reply.concat(tutorial_script3),
        waitTime: 1000,
      },
      this.chatHistory,
      this.chatSource,
      () => this.toggleReplyText(true),
      this.emitClick,
    );
  }

  private createPassword(text: string) {
    this.accountService.saveSignupdataPassword(text);

    const reply: ChatViewModel[] = [
      {
        id: 3,
        senderId: this.myself.id,
        contentType: CONTENT_TYPE.REPLY,
        body: text,
        createdAt: new Date().toString(),
      },
    ];

    addChat(
      {
        body: reply.concat(tutorial_script4),
        waitTime: 0,
      },
      this.chatHistory,
      this.chatSource,
    );
    setTimeout(() => this.scrollToBottom(), 0);
  }
}

const tutorial_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '王国へ入場するためのパスポートを発行するよ！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '君のメールアドレスを教えて',
    createdAt: new Date().toString(),
  },
];
const tutorial_script3: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'パスワードはどうする？君の好きな暗号を6文字以上で設定するんだ',
    createdAt: new Date().toString(),
  },
];
const tutorial_script4: ChatViewModel[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでOKかい？',
    createdAt: new Date().toString(),
  },
];
const tutorial_script5: ChatViewModel[] = [
  {
    id: 6,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'さあ、入国の手続きは完了だ！',
    createdAt: new Date().toString(),
  },
  {
    id: 7,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '毎日症状を記録して、一緒に戦う仲間を見つけよう！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script_error: ChatViewModel[] = [
  {
    id: 6,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'eメールの形式じゃないみたい。もう一回入力してみて！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script_error_email: ChatViewModel[] = [
  {
    id: 7,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'もうこのアドレスは登録されてるってさ！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script_error_regist: ChatViewModel[] = [
  {
    id: 7,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '申し訳ない＞＜',
    createdAt: new Date().toString(),
  },
  {
    id: 7,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'サーバエラーです。しばらくしてからもう一度お願いします。',
    createdAt: new Date().toString(),
  },
];
