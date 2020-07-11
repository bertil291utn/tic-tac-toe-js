// const readline = require('readline-sync');
const btn = document.querySelectorAll('[define-custom-id]');
const status = document.querySelector('#status');
const gameBoard = document.getElementsByClassName('btn');

let stepCounter = 1;

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

  return {
    winningGame,
    gameBoard,
    fullGameBoard,
  };
})();

const GameFlow = (() => {
  // create an player
  // add a sign
  const addPlayer = (name, tag) => Player(name, tag);
  const makeMove = (index, player) => {
    // GameBoard.gameBoard[index] = player.getTag();
    GameBoard.gameBoard.splice(index, 1, player.getTag());
    player.choices.push(index);
  };

  function gameOutcome(player) {
    return GameBoard.winningGame.some((win) => win.every((r) => player.choices.includes(r)));
  }

  const winner = (player1, player2) => {
    if (GameFlow.gameOutcome(player1)) {
      return `Player ${player1.getName()} is the winner`;
    }

    if (GameFlow.gameOutcome(player2)) {
      return `Player ${player2.getName()} is the winner`;
    }

    if (GameBoard.fullGameBoard()) {
      return "It's a draw";
    }
    return '';
  };

  const theresWinner = (player1, player2) => {
    if (GameFlow.gameOutcome(player1) || GameFlow.gameOutcome(player2)) {
      return true;
    }
    return false;
  };

  const itsDraw = () => {
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
    itsDraw,
  };
})();

const DOM = (() => {
  const gameBoardRender = (gameBoard) => {
    gameBoard.forEach((elem, index) => {
      btn[index].childNodes[0].innerHTML = typeof elem === 'number' ? '' : elem;
    });
  };

  const gameFlowDOM = (player1, player2, index, objecto) => {
    if (!/(X|O)/.test(GameBoard.gameBoard[index]) && !GameFlow.theresWinner(player1, player2)
    ) {
      const btnIndex = objecto.getAttribute('define-custom-id');
      const player = stepCounter % 2 === 0 ? player1 : player2;
      GameFlow.makeMove(+btnIndex, player);
      if (/(X|O)/.test(GameBoard.gameBoard[index])) {
        btn[index].classList.remove('active-game-block');
      }
      DOM.gameBoardRender(GameBoard.gameBoard);
      if (stepCounter >= 5) {
        const message = GameFlow.winner(player1, player2);
        status.innerHTML = message;
      }
      stepCounter += 1;
    }
    if (GameFlow.theresWinner(player1, player2)) {
      GameBoard.gameBoard.forEach((e, i) => {
        if (/\d/.test(e)) {
          btn[i].classList.remove('active-game-block');
        }
      });
    }
  };

  return {
    gameBoardRender,
    gameFlowDOM,
  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');

DOM.gameBoardRender(GameBoard.gameBoard);

for (let i = 0; i < gameBoard.length; i += 1) {
  gameBoard[i].addEventListener('click', function name(e) {
    e.preventDefault();
    DOM.gameFlowDOM(playerJason, playerMark, i, this);
  });
}
