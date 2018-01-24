import {
  Chat,
  Notification,
} from './swagger-models';
import {
  NotificationType,
} from 'app/constants/constants';

export * from './swagger-models';

/**
 * viewのためにswagger-modelsをオーバーライドする
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

export interface NotificationViewModel extends Notification {
  type: NotificationType; // enum型をつける
}
