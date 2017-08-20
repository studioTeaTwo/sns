import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { ChatService } from 'app/shared/services/api';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  JSON = JSON;
  chatList$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatList$ = this.store.changes.pluck('chatList');
    this.chatService.list();
  }

  onClick(chatTread) {
    this.router.navigate([`/chat/${chatTread.id}`]);
  }

}
