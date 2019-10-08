import collisionDetector from './CollisionDetector';
import { randItem } from '../../shared/helpers';

export class BotService {
  trackClosestPlayer(bot, gameState) {
    const players = gameState.getAlivePlayers().filter(player => player !== bot);
    if (players && players.length) {
      return players.reduce((previousPlayer, currentPlayer) => {
        const { distance: previousClosestDistance } = collisionDetector.detectCollision(
          bot,
          previousPlayer,
        );
        const { distance } = collisionDetector.detectCollision(bot, currentPlayer);
        return distance < previousClosestDistance ? currentPlayer : previousPlayer;
      });
    }
  }

  performRandKeys(bot) {
    const keys = [['W'], ['A'], ['S'], ['D']];
    bot.keys.clear();
    if (bot.isAlive()) {
      const keysCombinations = [
        ...keys,
        ['W', 'A'],
        ['A', 'S'],
        ['S', 'D'],
        ['D', 'W'],
        ['1'],
        ['2'],
        ['3'],
      ];
      const newKeys = randItem(keysCombinations);
      newKeys.push(randItem(['Shift', '']));
      newKeys.forEach(key => bot.keys.add(key));
    }
  }
}
const botService = new BotService();
export default botService;
