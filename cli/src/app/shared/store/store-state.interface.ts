import * as API from 'app/interfaces/api-models';

export interface StoreState {
    // APIデータ
    account: API.User;
    profile: API.Profile;
    notificationList: API.Notification[];
    activityList: API.Activity;
    chatList: API.ChatThread[];
    chats: API.Chat[];
    searchUsers: API.Profile[];
    dailyLogList: API.DailyLog[];
    dailyLog: API.DailyLog;

    masterAllergenGroups: API.MasterAllergenGroup[];

    // 外部サービス

    // 画面状態
    loading: boolean;
    error: boolean;
    errorMsg: string;

    // 開発用メニュー
  }
