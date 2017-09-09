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
  selector: 'app-step-symptom',
  templateUrl: '../../../components/chats/chat/chat.component.html',
  styleUrls: ['../../../components/chats/chat/chat.component.scss']
})
export class StepSymptomComponent extends ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('replyText') input: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  private selectedSymptoms = '';

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

    this.chatSource = new Subject<ChatViewModel[]>();
    this.chats$ = this.chatSource.asObservable();

    this.resetData();
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
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
  }

  onChangeChecked(item) {
    this.accountService.saveSignupdataSymptom(item);
    this.createReply(item);
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
    this.selectedSymptoms = result.checked ?
      this.selectedSymptoms.concat(result.name + 'です。<br/>') :
      this.selectedSymptoms.replace(result.name + 'です。<br/>', '');
    const body = this.selectedSymptoms.length !== 0 ? this.selectedSymptoms : '特に無い。';

    const reply: ChatViewModel[] = [{
      id: 4,
      senderId: this.myself.id,
      contentType: CONTENT_TYPE.REPLY,
      body: this.sanitizer.bypassSecurityTrustHtml(body),
      createdAt: new Date()
    }];
    addChat({
      body: reply.concat(tutorial_script2),
      waitTime: 0,
      tmp: true
    }, this.chatHistory, this.chatSource);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private reset() {
    this.resetData();

    this.chatHistory = [];
    this.chatHistory.push(...tutorial_script1);
  }

  private resetData() {
    tutorial_script1[0].itemList.forEach(value => value.checked = false);
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
        name: 'アトピー',
        checked: false,
      },
      {
        id: 'asthma',
        name: '喘息',
        checked: false,
      },
      {
        id: 'pollen',
        name: '花粉症',
        checked: false,
      },
      {
        id: 'rhinitis',
        name: '鼻炎',
        checked: false,
      },
      {
        id: 'gastroenteritis',
        name: '胃腸炎',
        checked: false,
      },
      {
        id: 'conjunctivitis',
        name: '結膜炎',
        checked: false,
      },
    ],
    createdAt: new Date()
  },
];
const tutorial_script2: ChatViewModel[] = [
  {
    id: 5,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: 'これでいいかい？',
    createdAt: new Date()
  },
];
