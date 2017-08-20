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
  body: string;
  createdAt: Date;
}
