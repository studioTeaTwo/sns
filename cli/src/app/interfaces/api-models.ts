import { Chat, User, Feed, ExperienceStrongParameter } from './swagger-models';

export * from './swagger-models';


/**
 * viewのためにswagger-modelsのプロパティを変更する
 */

export interface ChatViewModel extends Chat {
  contentType: CONTENT_TYPE;
  body?: any;
  itemList?: any;
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
  newestChat: ChatViewModel;
}
export type Chats = ChatViewModel[];

export interface OtherExperienceStrongParameter extends ExperienceStrongParameter {
  name?: string;
}
export interface FeedViewModel extends Feed {
  others?: OtherExperienceStrongParameter[];
}
