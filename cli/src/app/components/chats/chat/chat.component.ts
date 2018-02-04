import { Component, OnInit, Renderer2, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { map, concatMap, take } from 'rxjs/operators';

import { Store } from 'app/core/store/store';
import { KEY_CODE } from 'app/constants/constants';
import {
  ChatThread,
  Chats,
  ChatViewModel,
  CONTENT_TYPE,
  User,
} from 'app/interfaces/api-models';
import { RoutePram } from 'app/interfaces/view-models';
import { AccountService, ChatService } from 'app/core/services/api';

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

  chats$ = this.store.select<Chats>(state => state.chats);
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
    const account$ = this.accountService.get().pipe(map(response => this.myself = response));
    const params$ = this.route.params;

    zip<User, RoutePram>(account$, params$).pipe(
      map(result => {

        this.chatThread = this.store.getState().chatList.find(value => value.id === +result[1]['id']);
        const chats = this.store.getState().chats.find(value => value.chatThreadId === +result[1]['id']);

        // すでにチャットがあるのでそのまま始める
        if (this.chatThread && chats) {
          this.opponents = this.chatThread.participants.filter(value => value.id !== result[0].id);
          return;
        }

        this.chatService.resetChat();

        // もう既存のスレッドがあるがチャットは無い
        if (this.chatThread && !chats) {
          this.opponents = this.chatThread.participants.filter(value => value.id !== result[0].id);
          this.chatService.getChatThread(this.chatThread.id).subscribe();
          return;
        }

        // キャッシュがないので新規で通信取得する
        this.chatService.list()
          .pipe(concatMap(response => {
            this.chatThread = response.find(value => value.id === +result[1]['id']);
            this.opponents = this.chatThread.participants.filter(value => value.id !== result[0].id);
            return this.chatService.getChatThread(this.chatThread.id);
          }))
          .subscribe();
      }),
      take(1)
    )
    .subscribe(
      (next: void) => this.scrollToBottom(),
      (error: any) => this.router.navigateByUrl('/chat/list'),
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
    const opponent = this.chatThread.statuses.find(value => value.userId !== this.myself.id);
    // TODO: 3人以上の時
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
    this.chatService.say(this.chatThread.id, String(replyText).replace(/<[^>]+>/gm, ''));
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
    const element = this.renderer.selectRootElement('#replyText') as HTMLInputElement;
    element.focus();
  }

  private onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.KEY_ENTER) {
      const element = this.renderer.selectRootElement('#replyText') as HTMLInputElement;
      element.blur();
    }
  }
}
