export default function GameBoard({ onSelectSquare, board }) {

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) =>
        <li key={rowIndex}>
          <ol>
            {row.map((columnSymbol, columnSymbolIndex) => 
              <li key={columnSymbolIndex}>
                <button 
                onClick={() => onSelectSquare(rowIndex, columnSymbolIndex)}
                disabled={columnSymbol !== null}
                >
                  {columnSymbol}
                </button>
              </li>
            )}
          </ol>
        </li>
      )}
    </ol>
  );
}

