import { User } from 'app/interfaces/api-models';

export const NAVI_CHARA: User = {
  id: 1,
  avatarUrl: 'assets/images/naviAvatar.png',
  email: '',
  name: '',
  selfIntroduction: '',
  rank: 0,
  titleOfHonor: 0,
};

export const SIGNUP_USER: User = {
  id: 0,
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
    readUntil: 1
  }],
  participants: [],
  newestChat: null,
};
