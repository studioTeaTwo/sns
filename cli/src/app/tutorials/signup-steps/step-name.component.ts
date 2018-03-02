import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/core/store/store';
import { NAVI_CHARA, SIGNUP_USER } from 'app/constants/constants';
import { ChatThread, Chats, ChatViewModel, CONTENT_TYPE, User } from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/core/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/auth/signup/signup.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-name',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', [
      state(
        'selected',
        style({
          // 選択（selected）のスタイル
        }),
      ),
      transition('default => firstAction', [
        animate('0ms ease-in', style({ transform: 'scale(1.2)' })),
        animate('50ms ease-in', style({ transform: 'scale(1.0)' })),
        animate('100ms ease-in', style({ transform: 'scale(1.3)' })),
        animate('150ms ease-in', style({ transform: 'scale(1.0)' })),
        animate('200ms ease-in', style({ transform: 'scale(1.3)' })),
        animate('250ms ease-in', style({ transform: 'scale(1.0)' })),
      ]),
      transition('firstAction => secondAction', [
        animate('50ms ease-in', style({ transform: 'translate(0px, 0px) rotateZ(0deg)' })),
        animate('100ms ease-in', style({ transform: 'translate(2px, 2px) rotateZ(1deg)' })),
        animate('150ms ease-in', style({ transform: 'translate(0px, 2px) rotateZ(0deg)' })),
        animate('200ms ease-in', style({ transform: 'translate(2px, 0px) rotateZ(-1deg)' })),
        animate('250ms ease-in', style({ transform: 'translate(0px, 0px) rotateZ(0deg)' })),
      ]),
    ]),
  ],
})
export class StepNameComponent extends ChatComponent implements OnInit {
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
  ) {
    super(router, route, renderer, store, accountService, chatService);
    this.height = window.innerHeight - 42 - 50; // 42 = header.height 50 = footer.height

    this.animeState = 'default';

    this.showReplyText = false;
    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    if (ga) {
      ga('send', 'event', 'Signup', 'name');
    }

    this.myself = SIGNUP_USER;
    this.opponents = [{ ...NAVI_CHARA }];
    this.chatThread = NAVI_THREAD;

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
        waitTime: 2000,
      },
      this.chatHistory,
      this.chatSource,
      () => this.toggleReplyText(true),
      this.emitClick,
    );
  }

  onClickReply(text) {
    this.toggleReplyText(false);
    this.accountService.saveSignupdataName(text);

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
        body: reply,
        waitTime: 0,
      },
      this.chatHistory,
      this.chatSource,
    );

    tutorial_script3[0].body = `すごい！`;
    addChat(
      {
        body: tutorial_script3,
        waitTime: 1000,
      },
      this.chatHistory,
      this.chatSource,
      () => {
        const soundfile = this.renderer.selectRootElement('#soundsignup') as HTMLAudioElement;
        soundfile.play();
        return (this.animeState = 'firstAction');
      },
    );

    tutorial_script4[0].body = `${text}って言うんだ！`;
    addChat(
      {
        body: tutorial_script4,
        waitTime: 2000,
      },
      this.chatHistory,
      this.chatSource,
      // 次のステップへ
      () => {
        this.animeState = 'secondAction';
        return setTimeout(() => this.completed.emit(DisplayState.TYPE), 2000);
      },
    );
  }
}

const tutorial_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: 'ようこそ！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '君の名前を教えて！',
    createdAt: new Date().toString(),
  },
];
const tutorial_script3: ChatViewModel[] = [
  {
    id: 4,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '',
    createdAt: new Date().toString(),
  },
];
const tutorial_script4: ChatViewModel[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.REPLY,
    body: '',
    createdAt: new Date().toString(),
  },
];
