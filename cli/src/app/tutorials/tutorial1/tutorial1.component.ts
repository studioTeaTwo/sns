import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

import { Store } from 'app/shared/store/store';
import { NAVI_CHARA } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  Chat,
  User,
} from 'app/interfaces/api-models';
import { ChatService } from 'app/shared/services/api';
import { ChatComponent } from "app/components/chats/chat/chat.component";

@Component({
  selector: 'app-tutorial1',
  templateUrl: '../../components/chats/chat/chat.component.html',
  styleUrls: ['../../components/chats/chat/chat.component.scss']
})
export class Tutorial1Component extends ChatComponent implements OnInit {
  @ViewChild('replyText') input:ElementRef;
  chatSource: Subject<Chat[]>;

  constructor(
    router: Router,
    route: ActivatedRoute,
    renderer: Renderer2,
    store: Store,
    chatService: ChatService,
  ) {
    super(
      router,
      route,
      renderer,
      store,
      chatService,
    );
    this.height = window.innerHeight - (56 + 46 + 50);

    this.chatSource = new Subject<Chat[]>();
    this.chats$ = this.chatSource.asObservable();
  }

  ngOnInit() {
    this.myself = this.store.getState().account;
    this.opponents = [{...NAVI_CHARA, email: '', name: '', selfIntroduction: '', rank: '', titleOfHonor: ''}];
    this.chatThread = tutorial_thread;
    setTimeout(() => this.chatSource.next(tutorial_script1), 0);
    setTimeout(() => {
      this.chatSource.next(tutorial_script1.concat(tutorial_script2));
      this.input.nativeElement.click();
      if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
        this.isActive = true;
      }
    }, 2000);
  }

  handleClickReply(text) {
    if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
      this.isActive = false;
    }

    const reply: Chat[] = [{
      id: 3,
      senderId: this.myself.id,
      body: text,
      createdAt: new Date()
    }];
    this.chatSource.next(tutorial_script1.concat(tutorial_script2,reply));

    let body = `すごい！${text}って言うんだ！`;
    tutorial_script3[0].body = body;
    setTimeout(() => this.chatSource.next(tutorial_script1.concat(tutorial_script2, reply, tutorial_script3)), 1000);
  }
}

const tutorial_script1: Chat[] = [{
  id: 1,
  senderId: NAVI_CHARA.id,
  body: 'ようこそ！',
  createdAt: new Date()
}];
const tutorial_script2: Chat[] = [{
  id: 2,
  senderId: NAVI_CHARA.id,
  body: '君の名前を教えて！',
  createdAt: new Date()
}];
const tutorial_script3: Chat[] = [{
  id: 4,
  senderId: NAVI_CHARA.id,
  body: '',
  createdAt: new Date()
}];

const tutorial_thread = {
  id: 0,
  hasUnread: false,
  updatedAt: new Date(),
  readUntil: [{
    chatThreadId: 0,
    userId: NAVI_CHARA.id,
    readUntil: 1
  }],
  participants: [],
  newestChat: null,
};
