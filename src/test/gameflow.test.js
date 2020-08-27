/* eslint-disable comma-dangle */
import { GameFlow, Player, GameBoard } from '../assets/javascript/script';

describe('Game Flow module pattern ', () => {
  let player;
  let player2;
  beforeAll(() => {
    player = Player('Alfred', 'O');
    player2 = Player('Bertil', 'X');
  });

  describe('when the player makes a move', () => {
    it('displays a not empty player choices array ', () => {
      GameFlow.makeMove(1, player);
      expect(player.choices).not.toBe([]);
    });
  });

  describe('checks if a passed player is a winner', () => {
    it('returns a false if the player is not the winner', () => {
      expect(GameFlow.gameOutcome(player)).toBeFalsy();
    });

    it('returns a true if the player is the winner', () => {
      player.choices = [0, 1, 2];
      expect(GameFlow.gameOutcome(player)).toBeTruthy();
    });
  });

  describe('check the result of the match', () => {
    it('displays the message of the winning player', () => {
      player.choices = [];
      player2.choices = [3, 4, 5];
      expect(GameFlow.winner(player, player2)).toBe(
        `${player2.getName()} you've won the game`
      );
    });

    it('displays the message of the winning player', () => {
      player2.choices = [];
      player.choices = [3, 4, 5];
      expect(GameFlow.winner(player, player2)).toBe(
        `${player.getName()} you've won the game`
      );
    });

    it('displays the message of the winning player', () => {
      GameBoard.gameBoard = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
      player.choices = [];
      player2.choices = [];
      expect(GameFlow.winner(player, player2)).toMatch(/DRAW/);
    });
  });

  describe('Check if theres a winner or a draw', () => {
    it('returns a true value when theres a winner ', () => {
      player2.choices = [];
      player.choices = [3, 4, 5];
      expect(GameFlow.theresWinner(player, player2)).toBeTruthy();
    });
    it('returns a false value when theres no a winner ', () => {
      GameBoard.gameBoard = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
      player.choices = [];
      player2.choices = [];
      expect(GameFlow.theresWinner(player, player2)).toBeFalsy();
    });
    it("returns a true value when there's a draw game ", () => {
      GameBoard.gameBoard = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
      player.choices = [];
      player2.choices = [];
      expect(GameFlow.isDraw()).toBeTruthy();
    });
  });
});
