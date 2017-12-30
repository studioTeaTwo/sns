import {
  Chat,
  Feed,
  ExperienceStrongParameter
} from './swagger-models';

export * from './swagger-models';

/**
 * viewのためにswagger-modelsのプロパティを変更する
 */

export enum CONTENT_TYPE {
  REPLY,
  YESNO,
  CHECKBOX,
  RADIOBUTTON,
  CAMERA,
}
export interface ChatViewModel extends Chat {
  contentType: CONTENT_TYPE;
  body?: any; // アンケートのSafeHTMLを許可するため
  itemList?: any[]; // アンケートの質問
}
export type Chats = ChatViewModel[];

export interface OtherExperienceStrongParameter extends ExperienceStrongParameter {
  name?: string;
}
export interface FeedViewModel extends Feed {
  others?: OtherExperienceStrongParameter[];
}
