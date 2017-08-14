export interface StoreState {
    // APIデータ
    account: any,
    profile: any,
    searchUsers: any,
  
    // 外部サービス
  
    // 画面状態
    loading: boolean;
    error: boolean;
  
    // 開発用メニュー
  };