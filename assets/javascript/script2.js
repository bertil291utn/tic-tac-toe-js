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
    return GameBoard.gameBoard;
  };

  const displayBoard = () => { console.log(GameBoard.gameBoard); };

  const flow = (player1, player2, index) => {
    for (let i=0 ; i < 9 ; i++){
      // wait for the user to input an index
      let index = prompt("Please choose a cell");
      makeMove(index, i%2==0 ? player1 : player2);
      if (i>4 && theresWinner(player1, player2)) break;
    }
  };

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
    if (GameBoard.fullGameBoard() && !theresWinner) {
      return true;
    }
    return false;
  }


  return {
    addPlayer,
    makeMove,
    gameOutcome,
    winner,
    flow,
  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');
// console.log(GameBoard.gameBoard); // check the status of the board
// // getIndexFromUser
// GameFlow.flow(playerJason, playerMark, 0);
// console.log(GameFlow.winner(playerJason, playerMark));
// console.log(GameBoard.gameBoard); // check the status of the board

//0,2,1,3,5,4,6,7,8  tie
//0,1,2,3,4,5,6,7
// XOX
// OXO
// X78

playerJason.choices = [0, 1, 2];
playerMark.choices = [3, 4];
GameBoard.gameBoard = ['X', 'X', 'X', 'O', 'O', 5, 6, 7, 8];
// const gameOutcome = (player) =>
//  GameBoard.winningGame.some(winMatch => winMatch.every(r =>
//    player.choices.includes(r)));
console.log(GameFlow.gameOutcome(playerJason));


// GameBoard.winningGame.some(winMatch => winMatch.every(r =>
//    player.choices.includes(r)));

// console.log([0,1,2].every(r => playerJason.choices.includes(r)));
