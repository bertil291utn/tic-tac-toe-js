import { GameFlow } from '../assets/javascript/script';

describe('when it creates a new player', () => {
  it('returns a Object instance when the player was added correctly', () => {
    expect(GameFlow.addPlayer('Bertil', 'X')).toBeInstanceOf(Object);
  });
});
