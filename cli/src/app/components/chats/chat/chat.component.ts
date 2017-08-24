import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  ChatThread,
  Chats,
  Chat,
  User,
} from 'app/interfaces/api-models';
import { ChatService } from 'app/shared/services/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  height: number;

  chats$: Observable<Chats>;
  chatThread: ChatThread;
  myself: User;
  opponents: User[];

  isActive: boolean;
  loadingChatBack$: Observable<boolean>;
  loadingChatForward$: Observable<boolean>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private renderer: Renderer2,
    public store: Store,
    public chatService: ChatService,
  ) {
    this.height = window.innerHeight - (56 + 46 + 50); // header.height + chat.header.height + chat.footer.height
  }

  ngOnInit() {
    this.chats$ = this.store.changes.pluck('chats');
    this.myself = this.store.getState().account;

    this.route.params
      .map(params => {
        this.chatThread = this.store.getState().chatList.find(value => value.id === +params['id']);
        this.opponents = this.chatThread.participants.filter(value => value.id !== this.myself.id);
        this.chatService.get(params['id']);
      })
      .subscribe(
        () => console.log(),
        error => this.router.navigate(['/chat/list'])
      );
  }

  isDisplayDate() {}

  isOpponents(chat: Chat): boolean {
    return this.opponents.some(value => value.id === chat.senderId)
  }

  isDispalyReply() {}

  isUnread() {}

  getUnreadChat() {}

  handleClickReply(replyText: string, event: Event) {
    this.chatService.say(this.chatThread['id'], replyText);
  }

  private setFocus(event: Event) {
    event.preventDefault();
    const element = this.renderer.selectRootElement('#replyText') as HTMLInputElement;
    element.focus();
  }
}
