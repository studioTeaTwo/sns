import { Subject } from 'rxjs/Subject';
import {
  ChatThread,
  Chats,
  Chat,
} from 'app/interfaces/api-models';

interface NewChats {
  body: Chat[];
  waitTime: number;
  tmp?: boolean;
}

export function addChat(
  newChats: NewChats,
  currentThread: Chat[],
  chatSource: Subject<Chat[]>,
  callbackAdditionalEffect?: () => {},
) {
  setTimeout(() => {
    // 使い捨て
    if (newChats.hasOwnProperty('tmp') && newChats.tmp) {
      chatSource.next(currentThread.concat(newChats.body));
    // スレッドに保管
    } else {
      currentThread.push(...newChats.body);
      chatSource.next(currentThread);
    }
    if (callbackAdditionalEffect) { callbackAdditionalEffect() };
  }, newChats.waitTime);
}

export function addChatAndFocus(
  newChats: NewChats,
  currentThread: Chat[],
  chatSource: Subject<Chat[]>,
  callbackToggleReplyText: () => void,
  callbackEmitClick: () => {},
) {
  setTimeout(() => {
    // 使い捨て
    if (newChats.hasOwnProperty('tmp') && newChats.tmp) {
      chatSource.next(currentThread.concat(newChats.body));
    // スレッドに保管
    } else {
      currentThread.push(...newChats.body);
      chatSource.next(currentThread);
    }
    callbackToggleReplyText();
    callbackEmitClick();
  }, newChats.waitTime);
}
