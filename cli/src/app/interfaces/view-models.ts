import { TipsType } from 'app/constants/constants';

export interface RoutePram {
  [key: string]: any;
}

export interface BeginnerAdvice {
  adviceType: string;
  tipsType?: TipsType;
  description: string;
}
