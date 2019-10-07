import collisionDetector from './CollisionDetector';

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
}
const botService = new BotService();
export default botService;
