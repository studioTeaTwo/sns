import { User } from 'app/interfaces/api-models';
import { BeginnerAdvice } from 'app/interfaces/view-models';

export type TipsType =
  // プロフィール
  'profile-symptom' |'profile-messageicon' |
  // 治療日記
  'log-memo' | 'log-photo-record' | 'log-photo-camera' | 'log-photo-form' |
  // 検索
  'search-allergen';
export namespace TipsType {
  export const ProfileSymptom: TipsType = 'profile-symptom';
  export const ProfileMessageicon: TipsType = 'profile-messageicon';
  export const LogMemo: TipsType = 'log-memo';
  export const LogPhotoRecord: TipsType = 'log-photo-record';
  export const LogPhotoCamera: TipsType = 'log-photo-camera';
  export const LogPhotoForm: TipsType = 'log-photo-form';
  export const SearchAllergen: TipsType = 'search-allergen';
}
export const TipsCollection: BeginnerAdvice[] = [
  {
    adviceType: 'tips',
    tipsType: 'profile-symptom',
    description: '[TIPS]症状を登録していると毎日5時に通知が来るよ',
  },
  {
    adviceType: 'tips',
    tipsType: 'profile-messageicon',
    description: '[TIPS]プロフィールのメッセージアイコンからチャットを送れるよ',
  },
  {
    adviceType: 'tips',
    tipsType: 'log-memo',
    description: '[TIPS]治療日記にメモを書いてお医者さんに症状を伝えよう',
  },
  {
    adviceType: 'tips',
    tipsType: 'log-photo-record',
    description: '[TIPS]治療日記に写真を撮っておこう',
  },
  {
    adviceType: 'tips',
    tipsType: 'log-photo-camera',
    description: '[TIPS]治療日記ではその場でカメラで写真撮ることもできるよ',
  },
  {
    adviceType: 'tips',
    tipsType: 'log-photo-form',
    description: '[TIPS]写真は正方形で保存されるよ',
  },
  {
    adviceType: 'tips',
    tipsType: 'search-allergen',
    description: '[TIPS]アレルゲン検索から同じ症状の人を探せるよ',
  },
];

export type NotificationType = 'DailyLog' | 'Chat' | 'Followed';

export type Symptom = 'atopic' | 'asthma' | 'rhinitis' | 'pollen' | 'gastroenteritis' | 'conjunctivitis';
const SymptomMap: Map<Symptom, string> = new Map();
SymptomMap.set('atopic', 'アトピー');
SymptomMap.set('asthma', '喘息');
SymptomMap.set('rhinitis', '鼻炎');
SymptomMap.set('pollen', '花粉症');
SymptomMap.set('gastroenteritis', '胃腸炎');
SymptomMap.set('conjunctivitis', '結膜炎');
export const SymptomName = SymptomMap;

export type AllergenGroup =
  'allergenGroupInekakafun' |
  'allergenGroupZassoukafun' |
  'allergenGroupJyukikafun' |
  'allergenGroupChiri' |
  'allergenGroupDani' |
  'allergenGroupShinkin' |
  'allergenGroupSaikin' |
  'allergenGroupDoubutsu' |
  'allergenGroupSyokugyou' |
  'allergenGroupTamago' |
  'allergenGroupNyuuseihin' |
  'allergenGroupGyorui' |
  'allergenGroupKoukakurui' |
  'allergenGroupIkatako' |
  'allergenGroupKomugi' |
  'allergenGroupKomugiigai' |
  'allergenGroupNikurui' |
  'allergenGroupMamerui' |
  'allergenGroupKudamonorui' |
  'allergenGroupYasai' |
  'allergenGroupSonota' |
  'allergenGroupKiseityuu' |
  'allergenGroupYakubutsu' |
  'allergenGroupKontyuu' |
  '' ;
const AllergenGroupMap: Map<AllergenGroup, string> = new Map();
AllergenGroupMap.set('allergenGroupInekakafun', 'イネ科植物花粉');
AllergenGroupMap.set('allergenGroupZassoukafun', '雑草花粉');
AllergenGroupMap.set('allergenGroupJyukikafun', '樹木花粉');
AllergenGroupMap.set('allergenGroupChiri', '室内塵');
AllergenGroupMap.set('allergenGroupDani', 'ダニ');
AllergenGroupMap.set('allergenGroupShinkin', '真菌');
AllergenGroupMap.set('allergenGroupSaikin', '細菌');
AllergenGroupMap.set('allergenGroupDoubutsu', '動物');
AllergenGroupMap.set('allergenGroupSyokugyou', '職業性アレルゲン');
AllergenGroupMap.set('allergenGroupTamago', '卵');
AllergenGroupMap.set('allergenGroupNyuuseihin', '乳製品');
AllergenGroupMap.set('allergenGroupGyorui', '魚類');
AllergenGroupMap.set('allergenGroupKoukakurui', '甲殻類');
AllergenGroupMap.set('allergenGroupIkatako', 'イカ・タコ');
AllergenGroupMap.set('allergenGroupKomugi', '穀穀類（小麦）');
AllergenGroupMap.set('allergenGroupKomugiigai', '穀類（小麦以外）');
AllergenGroupMap.set('allergenGroupNikurui', '肉類');
AllergenGroupMap.set('allergenGroupMamerui', '豆類');
AllergenGroupMap.set('allergenGroupKudamonorui', '果物類');
AllergenGroupMap.set('allergenGroupYasai', '野菜');
AllergenGroupMap.set('allergenGroupSonota', '食物その他');
AllergenGroupMap.set('allergenGroupKiseityuu', '寄生虫');
AllergenGroupMap.set('allergenGroupYakubutsu', '薬物');
AllergenGroupMap.set('allergenGroupKontyuu', '昆虫');
export const AllergenGroupName = AllergenGroupMap;

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
