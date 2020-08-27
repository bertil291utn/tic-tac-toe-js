import { GameBoard } from '../assets/javascript/script';

describe('Game board ', () => {
  it('returns false if the game board is not full', () => {
    expect(GameBoard.fullGameBoard()).toBeFalsy();
  });

  it('returns true if the game board is full', () => {
    GameBoard.gameBoard = ['X', 'X', 'O', 'X', 'X', 'O', 'O', 'X', 'O'];
    expect(GameBoard.fullGameBoard()).toBeTruthy();
  });
});
