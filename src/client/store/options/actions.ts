import { Action } from 'redux';

export const SET_BLINKING = 'SET_BLINKING';
export const SET_BULLET_SHADOW = 'SET_BULLET_SHADOW';

export class SetBlinking implements Action {
  readonly type = SET_BLINKING;

  constructor(public payload: boolean) {}
}

export class SetBulletShadow implements Action {
  readonly type = SET_BULLET_SHADOW;

  constructor(public payload: boolean) {}
}

export type OptionsActions = SetBlinking | SetBulletShadow;
