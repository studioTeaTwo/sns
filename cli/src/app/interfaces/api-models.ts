import { SafeHtml } from '@angular/platform-browser';

import { Chat, User } from './swagger-models';

export * from './swagger-models';

export interface ChatViewModel extends Chat {
  id: number;
  senderId: number;
  contentType: CONTENT_TYPE;
  body?: any;
  itemList?: any;
  result?: string;
  expired?: boolean;
  createdAt?: any;
}
export enum CONTENT_TYPE {
  REPLY,
  YESNO,
  CHECKBOX,
  RADIOBUTTON,
  CAMERA,
}

export type ChatList = ChatThread[];
export interface ChatThread {
  id: number;
  hasUnread: boolean;
  updatedAt: Date;
  readUntil: ChatStatus[];
  participants: User[];
  newestChat: ChatViewModel;
}

export interface ChatStatus {
  userId: number;
  chatThreadId: number;
  readUntil: number;
}

export type Chats = ChatViewModel[];
