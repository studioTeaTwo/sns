import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/shared/store/store';
import {
  ChatThread,
  Chats,
  Chat,
  CONTENT_TYPE,
  User,
} from 'app/interfaces/api-models';
import { ChatService } from 'app/shared/services/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMove') scrollContainer: ElementRef;
  height: number;

  chats$: Observable<Chats>;
  chatThread: ChatThread;
  myself: User;
  opponents: User[];

  isActive = false;
  showReplyText = true;
  loadingChatBack$: Observable<boolean>;
  loadingChatForward$: Observable<boolean>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private renderer: Renderer2,
    public store: Store,
    public chatService: ChatService,
  ) {
    this.height = window.innerHeight - 50; // chat.footer.height
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

  isMyself(chat: Chat): boolean {
    if (!chat.body) { return false; }
    return (chat.contentType === CONTENT_TYPE.REPLY) && (chat.senderId === this.myself.id);
  }

  isOpponents(chat: Chat): boolean {
    if (!chat.body) { return false; }
    return (chat.contentType === CONTENT_TYPE.REPLY) && (this.opponents.some(value => value.id === chat.senderId));
  }

  isYesNo(chat: Chat): boolean {
    return (chat.contentType === CONTENT_TYPE.YESNO);
  }

  isCheckbox(chat: Chat): boolean {
    return (chat.contentType === CONTENT_TYPE.CHECKBOX) && chat.itemList ? true : false;
  }

  isRadiobutton(chat: Chat): boolean {
    return (chat.contentType === CONTENT_TYPE.RADIOBUTTON) && chat.itemList ? true : false;
  }

  getImgSrc(chat: Chat): string {
    if (chat.senderId === this.myself.id) {
      return this.myself.avatarUrl;
    } else {
      const speaker = this.opponents.find(value => value.id === chat.senderId);
      return speaker.avatarUrl;
    }
  }

  isUnread() {}

  getUnreadChat() {}

  onClickYes() {}

  onClickNo() {}

  onChangeChecked(item) {
  }

  onChangeRadio(item) {
  }

  onClickReply(replyText: string) {
    this.chatService.say(this.chatThread['id'], replyText);
  }

  // 継承先で使うためprivateにしていない
  protected scrollToTop() {
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

  // 継承先で使うためprivateにしていない
  protected scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  // 継承先で使うためprivateにしていない
  protected toggleReplyText(checked: boolean) {
    this.showReplyText = checked;
    if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
      this.isActive = checked;
    }
  }

  private setFocus(event: Event) {
    event.preventDefault();
    const element = this.renderer.selectRootElement('#replyText') as HTMLInputElement;
    element.focus();
  }
}
