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
      return true
    }
    return false;
  }

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
    theresWinner,
    itsDraw,
  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');
//WIN CASE
// GameFlow.makeMove(0, playerJason);
// GameFlow.makeMove(3, playerMark);
// GameFlow.makeMove(1, playerJason);
// GameFlow.makeMove(4, playerMark);
// GameFlow.makeMove(2, playerJason);
// console.log(GameFlow.winner(playerJason, playerMark));

//DRAW CASE


GameFlow.makeMove(0, playerJason);
GameFlow.makeMove(2, playerMark);
GameFlow.makeMove(1, playerJason);
GameFlow.makeMove(3, playerMark);
GameFlow.makeMove(5, playerJason);
const winner = GameFlow.winner(playerJason, playerMark) == '' ? false :;
for (let i=0 ; i < 9 ; i++){
  console.log(i%2==0 ? p1 : p2); // make user choose
  if (i>4) checkforWinner;   // check for winner
}

  console.log(GameFlow.winner(playerJason, playerMark));
GameFlow.makeMove(4, playerMark);
console.log(GameFlow.winner(playerJason, playerMark));
GameFlow.makeMove(6, playerJason);
console.log(GameFlow.winner(playerJason, playerMark));
GameFlow.makeMove(7, playerMark);
console.log(GameFlow.winner(playerJason, playerMark));
GameFlow.makeMove(8, playerJason);
console.log(GameFlow.winner(playerJason, playerMark));
//0,2,1,3,5,4,6,7,8

console.log(GameBoard.gameBoard);

