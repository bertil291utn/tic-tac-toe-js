/* eslint-disable no-unused-vars, no-undef */

// global variables
let players;

const Player = (name, tag) => {
  const getName = () => name;
  const getTag = () => tag;
  const choices = [];

  return { getName, getTag, choices };
};

const GameBoard = (() => {
  const winningGame = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const fullGameBoard = () => GameBoard.gameBoard.every((r) => /(X|O)/.test(r));

  const render = () => {
    GameBoard.gameBoard.forEach((elem, index) => {
      btn[index].childNodes[0].innerHTML = typeof elem === 'number' ? '' : elem;
    });
  };

  return {
    winningGame,
    gameBoard,
    fullGameBoard,
    render,
  };
})();

const GameFlow = (() => {
  const addPlayer = (name, tag) => Player(name, tag);
  const makeMove = (index, player) => {
    GameBoard.gameBoard.splice(index, 1, player.getTag());
    player.choices.push(index);
  };

  function gameOutcome(player) {
    return GameBoard.winningGame.some((win) => win.every((r) => player.choices.includes(r)));
  }

  const winner = (player1, player2) => {
    if (GameFlow.gameOutcome(player1)) {
      return `${player1.getName()} you've won the game`;
    }

    if (GameFlow.gameOutcome(player2)) {
      return `${player2.getName()} you've won the game`;
    }

    if (GameBoard.fullGameBoard()) {
      return 'DRAW';
    }
    return '';
  };

  const theresWinner = (player1, player2) => {
    if (GameFlow.gameOutcome(player1) || GameFlow.gameOutcome(player2)) {
      return true;
    }
    return false;
  };

  const isDraw = () => {
    if (GameBoard.fullGameBoard()) {
      return true;
    }
    return false;
  };

  return {
    addPlayer,
    makeMove,
    gameOutcome,
    winner,
    theresWinner,
    isDraw,
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