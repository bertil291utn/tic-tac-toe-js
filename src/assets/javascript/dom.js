/* eslint-disable no-unused-vars, no-undef */
import { Player, GameBoard } from './script';
// global variables
let stepCounter = 1;

// initialize DOM data
const btn = document.querySelectorAll('[data-id]');
const status = document.querySelector('#status');
const DOMBoard = document.querySelector('#board');
const player1Name = document.querySelector('#playerOneName');
const player2Name = document.querySelector('#playerTwoName');
const playersForm = document.querySelector('#playersForm');
const optionButtons = document.querySelector('#option-buttons');
const newGame = document.querySelector('#new-game');
const exit = document.querySelector('#exit');

const DOM = (() => {
  const gameFlowDOM = (player1, player2, position) => {
    const thereIsGame = !/(X|O)/.test(GameBoard.gameBoard[position]) && !GameFlow.theresWinner(player1, player2)
    && !GameFlow.isDraw();

    if (thereIsGame && position != null) {
      const player = stepCounter % 2 === 1 ? player1 : player2;
      GameFlow.makeMove(+position, player);
      if ((/(X|O)/).test(GameBoard.gameBoard[position])) {
        btn[position].classList.remove('active-game-block');
      }
      GameBoard.render();
      if (stepCounter >= 5) {
        const message = GameFlow.winner(player1, player2);
        status.innerHTML = message;
      }
      stepCounter += 1;
    }
    const thereIsNoGame = GameFlow.theresWinner(player1, player2) || GameFlow.isDraw();
    if (thereIsNoGame) {
      status.classList.remove('hidden');
      optionButtons.classList.remove('hidden');
      GameBoard.gameBoard.forEach((obj, index) => {
        if (/\d/.test(obj)) {
          btn[index].classList.remove('active-game-block');
        }
      });
    }
  };

  const initGame = (player1Name, player2Name) => {
    const playerOne = GameFlow.addPlayer(player1Name, 'X');
    const playerTwo = GameFlow.addPlayer(player2Name, 'O');
    return { playerOne, playerTwo };
  };

  const clearInputs = () => {
    player1Name.value = '';
    player2Name.value = '';
  };

  const newGameAction = (players) => {
    stepCounter = 1;
    GameBoard.gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    players.playerOne.choices = [];
    players.playerTwo.choices = [];
    status.classList.add('hidden');
    optionButtons.classList.add('hidden');
    GameBoard.render();
  };

  const exitAction = (players) => {
    stepCounter = 1;
    GameBoard.gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    GameBoard.render();
    clearInputs();
    delete players.playerOne;
    delete players.playerTwo;
    status.classList.add('hidden');
    optionButtons.classList.add('hidden');
    DOMBoard.classList.add('hidden');
    playersForm.classList.remove('hidden');
  };

  return {
    gameFlowDOM,
    initGame,
    newGameAction,
    exitAction,
  };
})();

playersForm.addEventListener('submit', (e) => {
  e.preventDefault();
  players = DOM.initGame(player1Name.value || 'Player 1', player2Name.value || 'Player 2');
  DOMBoard.classList.remove('hidden');
  playersForm.classList.add('hidden');
});

DOMBoard.addEventListener('click', (e) => {
  DOM.gameFlowDOM(players.playerOne, players.playerTwo, e.target.getAttribute('data-id'));
});

newGame.onclick = () => {
  DOM.newGameAction(players);
};

exit.onclick = () => {
  DOM.exitAction(players);
};