import * as API from 'app/interfaces/api-models';

export interface StoreState {
    // APIデータ
    account: any;
    profile: any;
    chatList: API.ChatList;
    chats: API.Chat[];
    searchUsers: any;

    // 外部サービス

    // 画面状態
    loading: boolean;
    error: boolean;

    // 開発用メニュー
  };
