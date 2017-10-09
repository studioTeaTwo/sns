import { Component, OnInit, Renderer2, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/shared/store/store';
import {
  ChatThread,
  Chats,
  ChatViewModel,
  CONTENT_TYPE,
  User,
} from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/shared/services/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('wholeanimation', []) // ダミー
  ]
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMove') scrollContainer: ElementRef;
  height: number;
  animeState: string;

  chats$: Observable<Chats>;
  chatThread: ChatThread;
  myself: User;
  opponents: User[];

  isActive = false;
  showReplyText = true;
  loadingChatBack$: Observable<boolean>;
  loadingChatForward$: Observable<boolean>;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected renderer: Renderer2,
    protected store: Store,
    protected accountService: AccountService,
    protected chatService: ChatService,
  ) {
    this.height = window.innerHeight - 50; // chat.footer.height
  }

  ngOnInit() {
    this.chats$ = this.store.changes.pluck('chats');
    this.accountService.get().subscribe(response => this.myself = response);

    this.route.params
      .map(params => {
        this.chatThread = this.store.getState().chatList.find(value => value.id === +params['id']);
        if (this.chatThread) {
          // チャットリストから開始したとき
          this.opponents = this.chatThread.participants.filter(value => value.id !== this.myself.id);
          this.chatService.getChatThread(+params['id']);
        } else {
          // プロフィールなどからチャット開始したとき
          this.chatService.createChatThread(+params['id']).subscribe(response => {
            this.chatThread = response;
            this.opponents = response.participants.filter(value => value.id !== this.myself.id);
            // もう既存のスレッドがあった
            if (this.chatThread.newestChat.id) {
              this.chatService.getChatThread(this.chatThread.id);
            }
          });
        }
      })
      .subscribe(
        () => this.scrollToBottom(),
        error => this.router.navigate(['/chat/list'])
      );
  }

  isDisplayDate() {}

  isMyself(chat: ChatViewModel): boolean {
    if (!chat.body) { return false; }
    return (chat.contentType === CONTENT_TYPE.REPLY) && (chat.senderId === this.myself.id);
  }

  isOpponents(chat: ChatViewModel): boolean {
    if (!chat.body) { return false; }
    return (chat.contentType === CONTENT_TYPE.REPLY) && (this.opponents.some(value => value.id === chat.senderId));
  }

  isYesNo(chat: ChatViewModel): boolean {
    return (chat.contentType === CONTENT_TYPE.YESNO);
  }

  isCheckbox(chat: ChatViewModel): boolean {
    return (chat.contentType === CONTENT_TYPE.CHECKBOX) && chat.itemList ? true : false;
  }

  isRadiobutton(chat: ChatViewModel): boolean {
    return (chat.contentType === CONTENT_TYPE.RADIOBUTTON) && chat.itemList ? true : false;
  }

  isCamera(chat: ChatViewModel): boolean {
    return (chat.contentType === CONTENT_TYPE.CAMERA);
  }

  getImgSrc(chat: ChatViewModel): string {
    if (chat.senderId === this.myself.id) {
      return this.myself.avatarUrl;
    } else {
      const speaker = this.opponents.find(value => value.id === chat.senderId);
      return speaker.avatarUrl;
    }
  }

  isRead(chat: ChatViewModel): boolean {
    const opponent = this.chatThread.readUntil.find(value => value.userId !== this.myself.id);
    return chat.id <= opponent.readUntil;
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
    this.chatService.say(this.chatThread['id'], String(replyText).replace(/<[^>]+>/gm, ''));
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
