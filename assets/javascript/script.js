const readline = require('readline-sync');

const Player = (name, tag) => {
  const getName = () => name;
  const getTag = () => tag;
  const choices = [];

  const move = () => {

  };
  return { getName, getTag, choices };
};

const GameBoard = (() => {
  const winningGame = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const fullGameBoard = () => gameBoard.every(r => (/(X|O)/).test(r));

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

  const displayBoard = () => { console.log(GameBoard.gameBoard); };

  const gameOutcome = (player) => GameBoard.winningGame.some(winMatch => winMatch.every(r => player.choices.includes(r)));

  const winner = (player1, player2) => {
    if (gameOutcome(player1)) {
      return `Player ${player1.getName()} is the winner`;
    }

    if (gameOutcome(player2)) {
      return `Player ${player2.getName()} is the winner`;
    }

    if (GameBoard.fullGameBoard()) {
      return "It's a draw";
    }
    return '';
  };

  const theresWinner = (player1, player2) => {
    if (gameOutcome(player1) || gameOutcome(player2)) {
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

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');

// init play entering a position 
let index = 1;
while (!GameFlow.theresWinner(playerJason, playerMark) || GameFlow.itsDraw()) {
  const player = index % 2 === 1 ? playerJason : playerMark;
  const indice = readline.question(`Enter index position ${player.getName()}: `);
  GameFlow.makeMove(+indice, player);

  if (index >= 5) {
    console.log(GameFlow.winner(playerJason, playerMark));
  }
  index += 1;
}

//0,2,1,3,5,4,6,7,8

console.log(GameBoard.gameBoard);

