import ICircle from '../../api/interfaces/ICircle';
import IRectangle from '../../api/interfaces/IRectangle';

export default class CollisionDetector {

    static detectCollision(object1: ICircle, object2: ICircle): boolean;
    static detectCollision(object1: IRectangle, object2: IRectangle): boolean
    static detectCollision(object1: ICircle, object2: IRectangle): boolean
    static detectCollision(object1: IRectangle, object2: ICircle): boolean
    static detectCollision(object1, object2) {
        switch ([object1.type, object2.type].join()) {
            case 'circle,circle':
                return this.detectCircularCollision(object1, object2);
            case 'rectangle,rectangle':
                return this.detectRectangleCollision(object1, object2);
            case 'circle,rectangle':
                return this.detectRectangleAndCircleCollision(object1, object2);
            case 'rectangle,circle':
                return this.detectRectangleAndCircleCollision(object2, object1);
        }
    }

    static detectCircularCollision(o1: ICircle, o2: ICircle): boolean {
        let dx = o1.x - o2.x;
        let dy = o1.y - o2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < o1.size + o2.size;
    }

    static detectRectangleCollision(o1: IRectangle, o2: IRectangle): boolean {
        return o2.x + o2.width > o1.x &&
            o2.y + o2.height > o1.y &&
            o1.x + o1.width > o2.x &&
            o1.y + o1.height > o2.y;
    }

    static detectRectangleAndCircleCollision(circle: ICircle, rect: IRectangle): boolean {
        let deltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        let deltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
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