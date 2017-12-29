import { User } from 'app/interfaces/api-models';

export const NAVI_CHARA: User = {
  id: 0,
  avatarUrl: 'assets/images/naviAvatar.png',
  email: '',
  name: '',
  selfIntroduction: '',
  rank: 0,
  titleOfHonor: 0,
};

export const SIGNUP_USER: User = {
  id: -1,
  avatarUrl: 'assets/images/newUserAvatar.png',
  email: '',
  name: '',
  selfIntroduction: '',
  rank: 0,
  titleOfHonor: 0,
};

export const NAVI_THREAD = {
  id: 0,
  hasUnread: false,
  updatedAt: new Date(),
  readUntil: [{
    chatThreadId: 0,
    userId: NAVI_CHARA.id,
    readUntil: 0
  }],
  participants: [],
  newestChat: null,
};

export const API_ERROR_MSGS = {
  BAD_REQUEST_400: '入力項目の確認をし、もう一度お試しください。',
  UNAUTHORIZED_401: '認証の有効期限が切れました\nお手数ですが、再度ログインをお願い致します。',
  FORBIDDEN_403: '操作に対する権限がありません。\nヘルプサポートにお問い合わせください',
  NOT_FOUND_404: '要求された操作が存在しません。\nページを再読込して最初から操作を行ってください。',
  NO_SUCH_MSATER_ENTITY_404: '%sマスタの設定に問題があります',
  NOT_ACCEPTABLE_406: '入力項目の確認をし、もう一度お試しください。',
  REQUEST_TIMEOUT_408: '要求がキャンセルされました。\n時間を置いてからもう一度お試しください。',
  CONFLICT_409: '他のユーザにデータが更新されています。\n再度画面を開いて処理を行ってください。',
  OTHER_CLIENT_ERROR: 'エラーが発生しました。\n入力項目の確認をし、もう一度お試しいただくか、時間を置いてからもう一度お試しください。',
  OTHER_SERVER_ERROR: 'サーバー側でエラーが発生しました。\n時間を置いてからもう一度お試しください。'
};

export enum KEY_CODE {
  KEY_TAB = 9,
  KEY_ENTER = 13,
  KEY_SHIFT = 16,
  KEY_ARROW_LEFT = 37,
  KEY_ARROW_UP = 38,
  KEY_ARROW_RIGHT = 39,
  KEY_ARROW_DOWN = 40,
  KEY_0 = 48,
  KEY_1 = 49,
  KEY_2 = 50,
  KEY_3 = 51,
  KEY_4 = 52,
  KEY_5 = 53,
  KEY_6 = 54,
  KEY_7 = 55,
  KEY_8 = 56,
  KEY_9 = 57,
  KEY_E = 69,
  NUMPAD_0 = 96,
  NUMPAD_1 = 97,
  NUMPAD_2 = 98,
  NUMPAD_3 = 99,
  NUMPAD_4 = 100,
  NUMPAD_5 = 101,
  NUMPAD_6 = 102,
  NUMPAD_7 = 103,
  NUMPAD_8 = 104,
  NUMPAD_9 = 105,
}
