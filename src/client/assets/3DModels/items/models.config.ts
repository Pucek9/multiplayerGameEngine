import {
  AID_KIT,
  AK47,
  AWP,
  BLACK,
  BROWN,
  GRENADE,
  LAND_MINE,
  PISTOL,
  RESIZER,
  SHOTGUN,
} from '../../../../shared/constants';

export const modelsConfig = {
  [SHOTGUN]: { scale: 0.07, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AK47]: { scale: 0.07, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AWP]: { scale: 0.7, color: BLACK, rotation: { x: 90, z: 90, y: 90 } },
  [RESIZER]: { scale: 0.06, color: BROWN, rotation: { x: 90, z: 90, y: 0 } },
  [PISTOL]: { scale: 0.03, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AID_KIT]: { scale: 0.22, rotation: { x: 90, z: 90, y: 0 } },
  [GRENADE]: { scale: 1.5, rotation: { x: 90, z: 90, y: 0 } },
  [LAND_MINE]: { scale: 80, rotation: { x: 90, z: 0, y: 0 } },
};
