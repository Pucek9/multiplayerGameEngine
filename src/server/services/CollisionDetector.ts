import ICircle from '../../shared/interfaces/ICircle';
import IRectangle from '../../shared/interfaces/IRectangle';
import { degToRad } from '../../shared/helpers';
import { Direction } from '../../shared/models/Direction';

interface collision {
  collision: boolean;
  angle?: { x: number; y: number };
}

class CollisionDetector {
  detectCollision(
    object1: ICircle | IRectangle,
    object2: ICircle | IRectangle,
    direction?: Direction,
  ): collision;

  detectCollision(object1, object2, direction: Direction = { x: 0, y: 0 }) {
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

  detectCircularCollision(o1: ICircle, o2: ICircle, direction: Direction): collision {
    const dx = o1.x - o2.x + direction.x;
    const dy = o1.y - o2.y + direction.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { collision: distance < o1.size + o2.size, angle: { x: -1, y: -1 } };
  }

  detectRectangleCollision(o1: IRectangle, o2: IRectangle, direction: Direction): collision {
    return {
      collision:
        o2.x + o2.width > o1.x &&
        o2.y + o2.height > o1.y &&
        o1.x + o1.width + direction.x > o2.x &&
        o1.y + o1.height + direction.y > o2.y,
    };
  }

  detectRectangleAndCircleCollision(
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

  detectUnRotatedRectangleAndCircleCollision(
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
      collision: deltaX + deltaY < circle.size,
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
  ): collision {
    function distance(x1: number, y1: number, x2: number, y2: number) {
      return Math.abs(x2 - x1) + Math.abs(y2 - y1);
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
      collision: distance(rotateCircleX, rotateCircleY, cx, cy) < circle.size,
      angle: { x: -1, y: -1 },
      // TODO angle need fix
      // angle: {
      //   x:
      //     rotateCircleX > cx
      //       ? -Math.abs(angleOfRad)
      //       : rotateCircleX < cx
      //       ? Math.abs(angleOfRad)
      //       : -1 + Math.abs(angleOfRad),
      //   y:
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
    return objects.some(
      object => collisionDetector.detectCollision(target, object, direction).collision,
    );
  }
}

const collisionDetector = new CollisionDetector();
export default collisionDetector;
