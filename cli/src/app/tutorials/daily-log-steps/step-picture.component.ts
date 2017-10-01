import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA, NAVI_THREAD } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  ChatViewModel,
  CONTENT_TYPE,
  User,
  DailyLogRequestBody,
} from 'app/interfaces/api-models';
import {
  AccountService,
  ChatService,
  DailyLogService,
} from 'app/shared/services/api';
import { ChatComponent } from 'app/components/chats/chat/chat.component';
import { addChat, addChatAndFocus } from '../shared/chat-operation.function';

@Component({
  selector: 'app-step-picture',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss']
})
export class StepPictureComponent extends ChatComponent implements OnInit {
  @ViewChild('replyText') inputElm: ElementRef;
  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;
  chatSource: Subject<ChatViewModel[]>;
  chatHistory: ChatViewModel[] = [];

  readonly medias = {audio : false, video : {
    facingMode : {
      exact : 'environment'
    }
  }};

  @Output() completed = new EventEmitter();

  private selectedResult: number;
  private emitClick = () => setTimeout(() => this.inputElm.nativeElement.click(), 0);

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    accountService: AccountService,
    chatService: ChatService,
    private sanitizer: DomSanitizer,
    private dailyLogService: DailyLogService,
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
    this.accountService.get().subscribe(response => this.myself = response);
    this.opponents = [{...NAVI_CHARA}];
    this.chatThread = NAVI_THREAD;

    this.toggleReplyText(false);

    addChat({
      body: daily_log_script1,
      waitTime: 0
    }, this.chatHistory, this.chatSource);
  }

  onClickYes() {
    window.navigator.getUserMedia(this.medias, this.successCallback, this.errorCallback);
    this.draw();
  }

  onClickNo() {
    // 次のステップへ
    this.router.navigate(['/']);
  }

  private successCallback(stream) {
    this.videoElm.nativeElement.srcObject = stream;
  };

  private errorCallback(err) {
    alert(err);
  };

  private draw() {
    const ctx = this.canvasElm.nativeElement.getContext('2d');
    this.canvasElm.nativeElement.width  = window.innerWidth;
    this.canvasElm.nativeElement.height = window.innerHeight;
    ctx.drawImage(this.videoElm.nativeElement, 0, 0);

    requestAnimationFrame(this.draw);
  }
}

const daily_log_script1: ChatViewModel[] = [
  {
    id: 1,
    senderId: NAVI_CHARA.id,
    contentType: CONTENT_TYPE.YESNO,
    body: '写真で記録する？',
    createdAt: new Date()
  },
];
