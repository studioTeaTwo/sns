import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  compareCreated,
  compareUpdated,
  unique
} from 'app/shared/functions/array-util.function';
import {
  ChatList,
  ChatThread,
  Chats,
  Chat,
  CONTENT_TYPE,
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

  getChatThread(chatThreadId: number) {
    this.httpClient.get<Chats>(`/api/chats/${chatThreadId}`)
      .subscribe(
        response => {
          this.onSuccessChats(response);
        }
      );
  }

  createChatThread(opponentUserId: number): Observable<ChatThread> {
    const body = {
      chat_thread: {
        participants: [opponentUserId]
      }
    };
    return this.httpClient.post<ChatThread>(`/api/chats`, body)
      .map(
        response => {
          this.onSuccessList([response]);
          return response;
        }
      );
  }

  say(chatThreadId: number, content: string) {
    const body = {
      chat: {
        chatThreadId: chatThreadId,
        contentType: CONTENT_TYPE.REPLY,
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
    data = unique(data.concat(...currentState.chatList));
    data.sort((a, b) => compareUpdated<ChatThread>(a, b));
    this.store.setState({
      ...currentState,
      chatList: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessChats(data: Chat[]) {
    const currentState = this.store.getState();
    data = unique(data.concat(...currentState.chats));
    data.sort((a, b) => compareCreated<Chat>(a, b));
    this.store.setState({
      ...currentState,
      chats: data,
      loading: false,
      error: false,
    });
  }
}
