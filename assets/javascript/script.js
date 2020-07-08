const Player = (name, tag) => {
  const getName = () => name;
  const getTag = () => tag;

  const move = () => {

  };
  return { getName, getTag, name, tag };
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
    return GameBoard.gameBoard;
  }
  // chooseMove()

  // makeMove()
  // displayBoard()
  // checkForWinner()

  return {
    addPlayer,
    makeMove,

  };
})();

const playerJason = GameFlow.addPlayer('Jason', 'X');
console.log(GameFlow.makeMove(0, playerJason));

