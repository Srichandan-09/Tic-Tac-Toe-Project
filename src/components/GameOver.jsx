export default function GameOver({ winnerName, onRestart }) {
    return (
      <div id="game-over">
        <h2>Game Over!</h2>
        <p>{winnerName ? `${winnerName} Won!` : `It's a draw` }</p>
        <p>
          <button onClick={onRestart}>Rematch!</button>
        </p>
      </div>
    );
}

