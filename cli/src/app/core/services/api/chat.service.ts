import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Store } from 'app/core/store/store';
import { compareCreated, compareUpdated, unique } from 'app/shared/functions/array-util.function';
import { ChatThread, Chats, ChatViewModel, CONTENT_TYPE } from 'app/interfaces/api-models';

@Injectable()
export class ChatService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  list(): Observable<ChatThread[]> {
    return this.httpClient.get<ChatThread[]>(`/api/chats`).pipe(
      map(response => {
        this.onSuccessList(response);
        return response;
      }),
    );
  }

  getChatThread(chatThreadId: number): Observable<Chats> {
    return this.httpClient.get<Chats>(`/api/chats/${chatThreadId}`).pipe(
      map(response => {
        this.onSuccessChats(response);
        return response;
      }),
    );
  }

  createChatThread(opponentUserId: number): Observable<ChatThread> {
    const body = {
      chat_thread: {
        participants: [opponentUserId],
      },
    };
    return this.httpClient.post<ChatThread>(`/api/chats`, body).pipe(
      map(response => {
        this.onSuccessList([response]);
        return response;
      }),
    );
  }

  say(chatThreadId: number, content: string) {
    const body = {
      chat: {
        chatThreadId: chatThreadId,
        contentType: CONTENT_TYPE.REPLY,
        body: content,
      },
    };
    this.httpClient
      .post<ChatViewModel>(`/api/chats/${chatThreadId}/say`, body)
      .subscribe(response => {
        this.onSuccessSay(response);
      });
  }

  resetChat() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      chats: [],
    });
  }

  private onSuccessList(data: ChatThread[]) {
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

  private onSuccessChats(data: ChatViewModel[]) {
    const currentState = this.store.getState();
    data.sort((a, b) => compareCreated<ChatViewModel>(a, b));
    this.store.setState({
      ...currentState,
      chats: data,
      loading: false,
      error: false,
    });
  }

  private onSuccessSay(data: ChatViewModel) {
    const currentState = this.store.getState();
    const newState = currentState.chats.concat(data);
    newState.sort((a, b) => compareCreated<ChatViewModel>(a, b));
    this.store.setState({
      ...currentState,
      chats: newState,
      loading: false,
      error: false,
    });
  }
}
