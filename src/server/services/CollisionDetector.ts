import ICircle from '../../shared/interfaces/ICircle';
import IRectangle from '../../shared/interfaces/IRectangle';
import { degToRad } from '../../shared/helpers';
import Direction from '../../shared/models/Direction';

interface collision {
  yes: boolean;
  angle?: { x: number; y: number };
}

export default class CollisionDetector {
  static detectCollision(
    object1: ICircle | IRectangle,
    object2: ICircle | IRectangle,
    direction?: Direction,
  ): collision;

  static detectCollision(object1, object2, direction: Direction = { x: 0, y: 0 }) {
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

  static detectCircularCollision(o1: ICircle, o2: ICircle, direction: Direction): collision {
    const dx = o1.x - o2.x + direction.x;
    const dy = o1.y - o2.y + direction.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { yes: distance < o1.size + o2.size, angle: { x: -1, y: -1 } };
  }

  static detectRectangleCollision(o1: IRectangle, o2: IRectangle, direction: Direction): collision {
    return {
      yes:
        o2.x + o2.width > o1.x &&
        o2.y + o2.height > o1.y &&
        o1.x + o1.width + direction.x > o2.x &&
        o1.y + o1.height + direction.y > o2.y,
    };
  }

  static detectRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): collision {
    if (rect.deg === 0) {
      return this.detectUnRotatedRectangleAndCircleCollision(circle, rect, direction);
    } else {
      return this.detectRotatedRectangleAndCircleCollision(circle, rect, direction);
    }
  }

  static detectUnRotatedRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): collision {
    const deltaX = Math.abs(
      circle.x +
        direction.x -
        Math.max(rect.x, Math.min(circle.x + direction.x, rect.x + rect.width)),
    );
    const deltaY = Math.abs(
      circle.y +
        direction.y -
        Math.max(rect.y, Math.min(circle.y + direction.y, rect.y + rect.height)),
    );
    return {
      yes: deltaX + deltaY < circle.size,
      angle:
        deltaX > deltaY ? { x: -1, y: 1 } : deltaX < deltaY ? { x: 1, y: -1 } : { x: -1, y: -1 },
    };
  }

  static detectRotatedRectangleAndCircleCollision(
    circle: ICircle,
    rect: IRectangle,
    direction: Direction,
  ): collision {
    function distance(x1: number, y1: number, x2: number, y2: number) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    let cx, cy;
    const angleOfRad = degToRad(-rect.deg);
    const rectCenterX = rect.x + rect.width / 2;
    const rectCenterY = rect.y + rect.height / 2;

    const rotateCircleX =
      Math.cos(angleOfRad) * (circle.x + direction.x - rectCenterX) -
      Math.sin(angleOfRad) * (circle.y + direction.y - rectCenterY) +
      rectCenterX;
    const rotateCircleY =
      Math.sin(angleOfRad) * (circle.x + direction.x - rectCenterX) +
      Math.cos(angleOfRad) * (circle.y + direction.y - rectCenterY) +
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
    return {
      yes: distance(rotateCircleX, rotateCircleY, cx, cy) < circle.size,
      angle:
        Math.abs(rotateCircleX - rotateCircleY) > Math.abs(cx - cy)
          ? { x: -1, y: 1 }
          : { x: 1, y: -1 },
    };
  }
}
