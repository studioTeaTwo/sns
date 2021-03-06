import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from 'app/core/store/store';
import { ChatThread, User } from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/core/services/api';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  chatList$ = this.store.select<ChatThread[]>(state => state.chatList);
  myself: User;

  loading$ = this.store.select<boolean>(state => state.loading);

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.accountService.get().subscribe(response => (this.myself = response));

    this.chatService.list().subscribe();
  }

  getImgSrc(chatThread: ChatThread): string {
    // TODO: 3人以上の時
    const user = chatThread.participants.find(value => value.id !== this.myself.id);
    return user ? user.avatarUrl : null;
  }

  onClick(chatThread: ChatThread) {
    this.router.navigate([`/chat/${chatThread.id}`]);
  }
}
