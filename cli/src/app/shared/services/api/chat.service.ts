import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  ChatList,
  ChatThread,
  Chats,
  Chat,
} from 'app/interfaces/api-models';

@Injectable()
export class ChatService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  list() {
    this.httpClient.get<ChatList>(`/api/chats`)
      .subscribe(
        response => {
          this.onSuccessList(response);
        }
      );
  }

  get(chatThreadId: number) {
    this.httpClient.get<Chats>(`/api/chats/${chatThreadId}`)
      .subscribe(
        response => {
          this.onSuccessChats(response);
        }
      );
  }

  post(opponentUserId: number): Observable<ChatThread> {
    const myAccount = this.store.getState().account;
    const body = {
      chat_thread: {
        participants: [opponentUserId]
      }
    };
    return this.httpClient.post<ChatThread>(`/api/chats`, body)
      .map(
        response => {
          this.onSuccessList([response]);
          return response
        }
      );
  }

  say(chatThreadId: number, content: string) {
    const body = {
      chat: {
        chat_thread_id: chatThreadId,
        body: content
      }
    };
    this.httpClient.post<Chat>(`/api/chats/${chatThreadId}/say`, body)
      .subscribe(
        response => {
          this.onSuccessChats([response]);
        }
      );
  }

  private onSuccessList(data: ChatList) {
    const currentState = this.store.getState();
    data = this.unique(data.concat(...currentState.chatList));
    data.sort(this.compareUpdated);
    this.store.setState({
      ...currentState,
      chatList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessChats(data: Chats) {
    const currentState = this.store.getState();
    data = this.unique(data.concat(...currentState.chats));
    data.sort(this.compareCreated);
    this.store.setState({
      ...currentState,
      chats: data,
      loading: false,
      error: false,
    });
  }

  private compareCreated(a: Chat, b: Chat): number {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }

  private compareUpdated(a: ChatThread, b: ChatThread): number {
    if (a.updatedAt < b.updatedAt) {
      return -1;
    }
    if (a.updatedAt > b.updatedAt) {
      return 1;
    }
    return 0;
  }

  private unique(array: Array<any>) {
    return array.filter((value, index, self) => {
      return self.findIndex(value2 => value.id === value2.id ) === index;
    });
  }

}
