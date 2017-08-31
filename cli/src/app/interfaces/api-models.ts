import { SafeHtml } from '@angular/platform-browser';

export interface User {
  id: number;
  email: string;
  name: string;
  selfIntroduction: string;
  rank: string;
  titleOfHonor: string;
  avatarUrl: string;
}

export type ChatList = ChatThread[];
export interface ChatThread {
  id: number;
  hasUnread: boolean;
  updatedAt: Date;
  readUntil: ChatStatus[];
  participants: User[];
  newestChat: Chat;
}

export interface ChatStatus {
  userId: number;
  chatThreadId: number;
  readUntil: number;
}

export type Chats = Chat[];
export interface Chat {
  id: number;
  senderId: number;
  contentType: CONTENT_TYPE;
  body?: string | SafeHtml;
  itemList?: any;
  result?: string,
  expired?: boolean;
  createdAt?: Date;
}
export enum CONTENT_TYPE {
  REPLY,
  YESNO,
  CHECKBOX,
  RADIOBUTTON,
}
