import Circle from './models/Circle';
import Rectangle from './models/Rectangle';
import Player from './Models/Player';
import Bullet from './Models/Bullet';

export default class CollisionDetector {

    // static detectCollision(object1, object2) {
    //     if(object1 instanceof Circle && object2 instanceof Circle) {
    //        return this.detectCircularCollision(object1, object2)
    //     } else if (object1 instanceof Circle && object2 instanceof Rectangle || object1 instanceof Rectangle && object2 instanceof Circle) {
    //         return this.detectRectangleCollision(object1, object2)
    //     }
    // }

    static detectCircularCollision(o1, o2) {
        let dx = o1.x - o2.x;
        let dy = o1.y - o2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < o1.size + o2.size;
    }

    static detectRectangleCollision(player : Player, bullet: Bullet) {
        return bullet.x - 1 < player.x + player.width &&
            bullet.x + 1 > player.x &&
            bullet.y - 1 < player.y + player.height &&
            bullet.y + 1 > player.y;
    }

    static detectPlayerCollision(o1, o2, cx, cy) {
        return o1.x - o1.width / 2 < -o2.x + o2.width / 2 + cx &&
            o1.x + o2.width / 2 + o1.width / 2 > -o2.x + cx &&
            o1.y - o1.height / 2 < -o2.y + o2.height / 2 + cy &&
            o1.y + o2.height / 2 + o1.height / 2 > -o2.y + cy;
    }
}