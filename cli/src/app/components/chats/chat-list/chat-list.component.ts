import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { ChatService } from 'app/shared/services/api';
import { ChatThread, User } from 'app/interfaces/api-models';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  JSON = JSON;
  chatList$: Observable<ChatThread[]>;
  myself: User;

  constructor(
    private router: Router,
    private store: Store,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatList$ = this.store.changes.pluck('chatList');
    this.myself = this.store.getState().account;

    this.chatService.list();
  }

  getImgSrc(chatThread: ChatThread) {
    // TODO: 3人以上の時
    const user = chatThread.participants.find(value => value.id !== this.myself.id);
    return user.avatarUrl;
  }

  onClick(chatTread: ChatThread) {
    this.router.navigate([`/chat/${chatTread.id}`]);
  }

}
