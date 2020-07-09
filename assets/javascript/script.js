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

  return {
    winningGame,
    gameBoard,
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
  }

  const displayBoard = () => { console.log(GameBoard.gameBoard); }

  const gameOutcome = (player) => {
    return GameBoard.winningGame.some( winMatch => winMatch.every(r => player.choices.includes(r) ) );
  }

  // displayBoard()
  // checkForWinner()

  return {
    addPlayer,
    makeMove,
    gameOutcome,
  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
const playerMark = GameFlow.addPlayer('Mark', 'O');
GameFlow.makeMove(0, playerJason);
console.log(playerJason);
GameFlow.makeMove(3, playerMark);
GameFlow.makeMove(1, playerJason);
GameFlow.makeMove(4, playerMark);
GameFlow.makeMove(2, playerJason);
console.log(GameFlow.gameOutcome(playerMark));
