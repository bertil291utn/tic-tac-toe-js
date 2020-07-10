// const readline = require('readline-sync');
const btn = document.querySelectorAll('[define-custom-id]');
const status = document.querySelector('#status');
let stepCounter = 1;

const Player = (name, tag) => {
  const getName = () => name;
  const getTag = () => tag;
  const choices = [];

  return { getName, getTag, choices };
};


const GameBoard = (() => {
  const winningGame = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const fullGameBoard = () => GameBoard.gameBoard.every(r => (/(X|O)/).test(r));

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

  const displayBoard = () => { };

  const gameOutcome = (player) => GameBoard.winningGame.some(winMatch => winMatch.every(r => player.choices.includes(r)));

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
      btn[index].childNodes[0].innerHTML = typeof (elem) === 'number' ? '' : elem;
    });
  };

  return {
    gameBoardRender,
  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');

const gameBoard = document.getElementsByClassName('btn');

// GameBoard.gameBoard = [0, 1, 'O',
//   'O', 'O', 'X',
//   'X', 'X', 'O'];

DOM.gameBoardRender(GameBoard.gameBoard);

for (let i = 0; i < gameBoard.length; i += 1) {
  gameBoard[i].addEventListener('click', function name(e) {
    if (!(/(X|O)/).test(GameBoard.gameBoard[i])) {
      // e.preventDefault();
      const btnIndex = this.getAttribute("define-custom-id");
      const player = stepCounter % 2 === 0 ? playerJason : playerMark;
      GameFlow.makeMove(+btnIndex, player);
      if ((/(X|O)/).test(GameBoard.gameBoard[i])) {
        btn[i].classList.remove('active-game-block');
      }
      DOM.gameBoardRender(GameBoard.gameBoard);
      if (stepCounter >= 5) {
        const message = GameFlow.winner(playerJason, playerMark);
        status.innerHTML = message;
        if (GameFlow.theresWinner) {
          GameBoard.gameBoard.forEach((e, i) => {
            if ((/\d/).test(e)) {
              btn[i].classList.remove('active-game-block');
              // block the click function
            }
          })
        }
      }
      stepCounter += 1;
    }

  });
}


// init play entering a position 
// let index = 1;
// while (!GameFlow.theresWinner(playerJason, playerMark) && !GameFlow.itsDraw()) {
//   const player = index % 2 === 1 ? playerJason : playerMark;
//   const indice = readline.question(`Enter index position ${player.getName()}: `);
//   GameFlow.makeMove(+indice, player);

//   if (index >= 5) {
//     console.log(GameFlow.winner(playerJason, playerMark));
//   }
//   index += 1;
// }

//0,2,1,3,5,4,6,7,8  tie
//0,1,2,3,4,5,6,7
// playerJason.choices = [0, 1, 5, 6, 7];
// playerMark.choices = [2, 3, 4, 8];
// GameBoard.gameBoard = ['X', 'X', 'O',
//                        'O', 'O', 'X',
//                        'X', 'X', 'O'];
// console.log(playerJason.choices);
// console.log(playerMark.choices);
// console.log(GameFlow.theresWinner(playerJason, playerMark));
// console.log("GameOutcome:");
// console.log(GameFlow.gameOutcome(playerJason));
// console.log("Tie?:");
// console.log(GameFlow.winner(playerJason, playerMark));
// //0,2,1,3,5,4,6,7,8

// console.log(GameBoard.gameBoard);
// console.log(GameBoard.fullGameBoard());
// console.log(GameBoard.gameBoard.every(r => (/(X|O)/).test(r)));

// // Plan B
// GameFlow.makeMove(+indice, player);
// GameFlow.makeMove(+indice, player);
// GameFlow.makeMove(+indice, player);
// GameFlow.makeMove(+indice, player);
// GameFlow.makeMove(+indice, player);
// GameFlow.winner(playerJason, playerMark);
// GameFlow.makeMove(+indice, player);
// GameFlow.winner(playerJason, playerMark);
// GameFlow.makeMove(+indice, player);
// GameFlow.winner(playerJason, playerMark);
// GameFlow.makeMove(+indice, player);
// GameFlow.winner(playerJason, playerMark);