import ICircle from '../../shared/interfaces/ICircle';
import IRectangle from '../../shared/interfaces/IRectangle';
import { degToRad } from '../../shared/helpers';
import Direction from '../../shared/models/Direction';
import Bullet from '../models/Bullet';

export interface Angle {
  x: number;
  y: number;
}

export interface CollisionInfo {
  collision: boolean;
  angle?: Angle;
  distance?: number;
}

export class CollisionDetector {
  getDistance(x1: number, y1: number, x2: number, y2: number) {
    const deltaX = Math.abs(x2 - x1);
    const deltaY = Math.abs(y2 - y1);
    const distance = deltaX + deltaY;
    return { deltaX, deltaY, distance };
  }

  detectCollision(
    object1: ICircle | IRectangle,
    object2: ICircle | IRectangle,
    direction?: Direction,
  ): CollisionInfo;

  detectCollision(object1, object2, direction: Direction = { dx: 0, dy: 0 }) {
    switch ([object1.shape, object2.shape].join()) {
      case 'circle,circle':
        return this.detectCircularCollision(object1, object2, direction);
      case 'rectangle,rectangle':
        return this.detectRectangleCollision(object1, object2, direction);
      case 'circle,rectangle':
        return this.detectRectangleAndCircleCollision(object1, object2, direction);
      case 'rectangle,circle':
        return this.detectRectangleAndCircleCollision(object2, object1, direction);
    }
  }

  detectCircularCollision(o1: ICircle, o2: ICircle, direction: Direction): CollisionInfo {
    const dx = o1.x - o2.x + direction.dx;
    const dy = o1.y - o2.y + direction.dy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let [x, y] = [-1, -1];
    if (o1 instanceof Bullet) {
      const theta = o1.getAngle();
      const phi = Math.atan2(o2.y - o1.y, o2.x - o1.x);
      const dx =
        ((o1.speed * Math.cos(theta - phi) * (o1.size - o2.size)) / (o1.size + o2.size)) *
          Math.cos(phi) +
        o1.speed * Math.sin(theta - phi) * Math.cos(phi + Math.PI / 2);
      const dy =
        ((o1.speed * Math.cos(theta - phi) * (o1.size - o2.size)) / (o1.size + o2.size)) *
          Math.sin(phi) +
        o1.speed * Math.sin(theta - phi) * Math.sin(phi + Math.PI / 2);
      x = dx / direction.dx;
      y = dy / direction.dy;
    }
    return { collision: distance < o1.size + o2.size, angle: { x, y }, distance };
  }

  detectRectangleCollision(o1: IRectangle, o2: IRectangle, direction: Direction): CollisionInfo {
    return {
      collision:
        o2.x + o2.width > o1.x &&
        o2.y + o2.height > o1.y &&
        o1.x + o1.width + direction.dx > o2.x &&
        o1.y + o1.height + direction.dy > o2.y,
    };
  }

  detectRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): CollisionInfo {
    if (rect.deg === 0) {
      return this.detectUnRotatedRectangleAndCircleCollision(circle, rect, direction);
    } else {
      return this.detectRotatedRectangleAndCircleCollision(circle, rect, direction);
    }
  }

  detectUnRotatedRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): CollisionInfo {
    const { deltaX, deltaY, distance } = this.getDistance(
      circle.x + direction.dx,
      circle.y + direction.dy,
      Math.max(rect.x, Math.min(circle.x + direction.dx, rect.x + rect.width)),
      Math.max(rect.y, Math.min(circle.y + direction.dy, rect.y + rect.height)),
    );

    return {
      collision: distance < circle.size,
      distance: distance,
      angle: {
        x: deltaX >= deltaY ? -1 : 1,
        y: deltaX <= deltaY ? -1 : 1,
      },
    };
  }

  detectRotatedRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): CollisionInfo {
    let cx, cy;
    const angleOfRad = degToRad(-rect.deg);
    const rectCenterX = rect.x + rect.width / 2;
    const rectCenterY = rect.y + rect.height / 2;

    const rotateCircleX =
      Math.cos(angleOfRad) * (circle.x + direction.dx - rectCenterX) -
      Math.sin(angleOfRad) * (circle.y + direction.dy - rectCenterY) +
      rectCenterX;
    const rotateCircleY =
      Math.sin(angleOfRad) * (circle.x + direction.dx - rectCenterX) +
      Math.cos(angleOfRad) * (circle.y + direction.dy - rectCenterY) +
      rectCenterY;

    if (rotateCircleX < rect.x) {
      cx = rect.x;
    } else if (rotateCircleX > rect.x + rect.width) {
      cx = rect.x + rect.width;
    } else {
      cx = rotateCircleX;
    }

    if (rotateCircleY < rect.y) {
      cy = rect.y;
    } else if (rotateCircleY > rect.y + rect.height) {
      cy = rect.y + rect.height;
    } else {
      cy = rotateCircleY;
    }
    const { distance } = this.getDistance(rotateCircleX, rotateCircleY, cx, cy);
    return {
      collision: distance < circle.size,
      distance,
      angle: { x: -1, y: -1 },
      // TODO angle need fix
      // angle: {
      //   dx:
      //     rotateCircleX > cx
      //       ? -Math.abs(angleOfRad)
      //       : rotateCircleX < cx
      //       ? Math.abs(angleOfRad)
      //       : -1 + Math.abs(angleOfRad),
      //   dy:
      //     rotateCircleY > cy
      //       ? -Math.abs(angleOfRad)
      //       : rotateCircleY < cy
      //       ? Math.abs(angleOfRad)
      //       : -1 + Math.abs(angleOfRad),
      // },
    };
  }

  detectObjectCollisionWithOtherObjects(
    target: ICircle | IRectangle,
    objects: (ICircle | IRectangle)[],
    direction?: Direction,
  ): boolean {
    return objects.some(object => this.detectCollision(target, object, direction).collision);
  }
}

const collisionDetector = new CollisionDetector();
export default collisionDetector;
