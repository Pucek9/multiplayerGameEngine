import ICircle from '../../common/interfaces/ICircle';
import IRectangle from '../../common/interfaces/IRectangle';

export default class CollisionDetector {

    static detectCollision(object1: ICircle, object2: ICircle, direction?: { x: number, y: number }): boolean;
    static detectCollision(object1: IRectangle, object2: IRectangle, direction?: { x: number, y: number }): boolean
    static detectCollision(object1: ICircle, object2: IRectangle, direction?: { x: number, y: number }): boolean
    static detectCollision(object1: IRectangle, object2: ICircle, direction?: { x: number, y: number }): boolean
    static detectCollision(object1, object2, direction = {x: 0, y: 0}) {
        switch ([object1.type, object2.type].join()) {
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

    static detectCircularCollision(o1: ICircle, o2: ICircle, direction): boolean {
        let dx = direction.x + o1.x - o2.x;
        let dy = direction.y + o1.y - o2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < o1.size + o2.size;
    }

    static detectRectangleCollision(o1: IRectangle, o2: IRectangle, direction): boolean {
        return o2.x + o2.width > o1.x &&
            o2.y + o2.height > o1.y &&
            o1.x + o1.width + direction.x > o2.x &&
            o1.y + o1.height + direction.y > o2.y;
    }

    static detectRectangleAndCircleCollision(circle: ICircle, rect: IRectangle, direction): boolean {
        let deltaX = circle.x + direction.x - Math.max(rect.x, Math.min(circle.x + direction.x, rect.x + rect.width));
        let deltaY = circle.y + direction.y - Math.max(rect.y, Math.min(circle.y + direction.y, rect.y + rect.height));
        return (deltaX * deltaX + deltaY * deltaY) < (circle.size * circle.size);
    }

    // static detectRectangleCollision(o1: IRectangle, o2: IRectangle) {
    //     return o1.x - 1 < o2.x + o2.width &&
    //         o1.x + 1 > o2.x &&
    //         o1.y - 1 < o2.y + o2.height &&
    //         o1.y + 1 > o2.y;
    // }

    // static detectPlayerCollision(o1, o2, cx, cy) {
    //     return o1.x - o1.width / 2 < -o2.x + o2.width / 2 + cx &&
    //         o1.x + o2.width / 2 + o1.width / 2 > -o2.x + cx &&
    //         o1.y - o1.height / 2 < -o2.y + o2.height / 2 + cy &&
    //         o1.y + o2.height / 2 + o1.height / 2 > -o2.y + cy;
    // }
}