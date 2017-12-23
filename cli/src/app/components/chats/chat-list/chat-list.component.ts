import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { ChatThread, User } from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/shared/services/api';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  chatList$: Observable<ChatThread[]>;
  myself: User;

  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.loading$ = this.store.changes.pluck('loading');
    this.chatList$ = this.store.changes.pluck('chatList');
    this.accountService.get().subscribe(response => this.myself = response);

    this.chatService.list();
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
