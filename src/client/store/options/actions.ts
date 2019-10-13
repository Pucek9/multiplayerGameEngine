export const SET_BLINKING = 'SET_BLINKING';
export const SET_BULLET_SHADOW = 'SET_BULLET_SHADOW';

export class SetBlinking {
  readonly type = SET_BLINKING;

  constructor(public payload) {}
}

export class SetBulletShadow {
  readonly type = SET_BULLET_SHADOW;

  constructor(public payload) {}
}

export type OptionsActions = SetBlinking | SetBulletShadow;
