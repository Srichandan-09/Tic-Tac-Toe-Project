import { useState } from "react";

import Players from "./components/Players";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCominations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function deriveGameBoard(initialGameBoard, gameTurns) {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}



function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(INITIAL_GAME_BOARD, gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDrawn = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      const curActivePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: curActivePlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    setPlayers(PLAYERS);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            key={players.X}
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handlePlayerNameChange}
          />
          <Players
            key={players.O}
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDrawn) && (
          <GameOver winnerName={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log logData={gameTurns} />
    </main>
  );
}

export default App;
