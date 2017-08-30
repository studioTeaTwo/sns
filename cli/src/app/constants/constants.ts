export const NAVI_CHARA = {
  id: 1,
  avatarUrl: 'assets/images/navi_avatar.png',
  email: '',
  name: '',
  selfIntroduction: '',
  rank: '',
  titleOfHonor: '',
};

export const SIGNUP_THREAD = {
  id: 0,
  hasUnread: false,
  updatedAt: new Date(),
  readUntil: [{
    chatThreadId: 0,
    userId: NAVI_CHARA.id,
    readUntil: 1
  }],
  participants: [],
  newestChat: null,
};
