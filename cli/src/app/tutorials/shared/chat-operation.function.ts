import { Subject } from 'rxjs';
import { ChatThread, Chats, Chat } from 'app/interfaces/api-models';
import { NAVI_CHARA } from 'app/constants/constants';

interface NewChats {
  body: Chat[];
  waitTime: number;
  tmp?: boolean;
}

export const NAVI_THREAD: ChatThread = {
  id: 0,
  updatedAt: new Date().toString(),
  statuses: [
    {
      chatThreadId: 0,
      userId: NAVI_CHARA.id,
      readUntil: 0,
    },
  ],
  participants: [],
  newestChat: null,
};

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
    if (callbackAdditionalEffect) {
      callbackAdditionalEffect();
    }
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
