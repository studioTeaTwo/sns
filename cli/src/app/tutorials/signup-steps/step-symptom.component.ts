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
import { Observable ,  Subject } from 'rxjs';

import { Store } from 'app/core/store/store';
import { NAVI_CHARA, SIGNUP_USER, SymptomName } from 'app/constants/constants';
import { ChatThread, Chats, ChatViewModel, CONTENT_TYPE, User } from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/core/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { DisplayState } from 'app/components/auth/signup/signup.component';
import { addChat, addChatAndFocus, NAVI_THREAD } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-symptom',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss'],
  animations: [
    trigger('wholeanimation', []), // ダミー
  ],
})
export class StepSymptomComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') input: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  @Output() completed = new EventEmitter();

  private selectedSymptoms = '';

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

    this.resetData();
  }

  ngOnInit() {
    ga('send', 'event', 'Signup', 'symptom');

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
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  onChangeChecked(item) {
    this.accountService.saveSignupdataSymptom(item);
    this.createReply(item);
  }

  onClickYes() {
    // 次のステップへ
    this.completed.emit(DisplayState.EMAIL);
  }

  onClickNo() {
    this.scrollToTop();

    this.reset();
    this.chatSource.next(this.chatHistory);
  }

  private createReply(result) {
    this.selectedSymptoms = result.checked
      ? this.selectedSymptoms.concat(result.name + 'です。<br>')
      : this.selectedSymptoms.replace(result.name + 'です。<br>', '');
    const body = this.selectedSymptoms.length !== 0 ? this.selectedSymptoms : '特に無い。';

    const reply: ChatViewModel[] = [
      {
        id: 4,
        senderId: this.myself.id,
        contentType: CONTENT_TYPE.REPLY,
        body: this.sanitizer.bypassSecurityTrustHtml(body),
        createdAt: new Date().toString(),
      },
    ];
    addChat(
      {
        body: reply.concat(tutorial_script2),
        waitTime: 0,
        tmp: true,
      },
      this.chatHistory,
      this.chatSource,
    );
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    this.resetData();

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1);
  }

  private resetData() {
    tutorial_script1[0].itemList.forEach(value => (value.checked = false));
    tutorial_script1[0].expired = false;

    this.selectedSymptoms = '';
    this.accountService.saveSignupdataSymptom(null);
  }
}

const tutorial_script1: ChatViewModel[] = [
  {
    id: 2,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.CHECKBOX,
    body: '君はどんな症状を持っているんだい？',
    itemList: [
      {
        id: 'atopic',
        name: SymptomName.get('atopic'),
        checked: false,
      },
      {
        id: 'asthma',
        name: SymptomName.get('asthma'),
        checked: false,
      },
      {
        id: 'pollen',
        name: SymptomName.get('pollen'),
        checked: false,
      },
      {
        id: 'rhinitis',
        name: SymptomName.get('rhinitis'),
        checked: false,
      },
      {
        id: 'gastroenteritis',
        name: SymptomName.get('gastroenteritis'),
        checked: false,
      },
      {
        id: 'conjunctivitis',
        name: SymptomName.get('conjunctivitis'),
        checked: false,
      },
    ],
    createdAt: new Date().toString(),
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかい？',
    createdAt: new Date().toString(),
  },
];
