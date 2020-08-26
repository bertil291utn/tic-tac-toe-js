import { GameFlow, Player } from '../assets/javascript/script';

describe('Game Flow module pattern ', () => {
  let player;
  beforeAll(() => {
    player = Player('Alfred', 'O');
  });

  describe('when the player makes a move', () => {
    it('displays a not empty player choices array ', () => {
      GameFlow.makeMove(1, player);
      expect(player.choices).not.toBe([]);
    });
  });
});
