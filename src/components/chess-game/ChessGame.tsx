import * as React from "react";
import { useGame } from "./hooks";
import classNames from "classnames";
import styles from "./ChessGame.module.css";

interface ChessGameProps {}

const ChessGame: React.FC<ChessGameProps> = () => {
  const [{ pieces, board, selected }, game] = useGame();

  if (!game) return null;

  const handleClick = (col: number, row: number) => {
    if (selected && [...selected.possibleMoves.attack, ...selected.possibleMoves.move].find(p => p[0] === col && p[1] === row)) {
      return game.move(selected.position, [col, row])
    }

    game.selectPiece([col, row]);
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.board}>
        <div className={styles.legendH}>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
        <div className={styles.legendV}>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
        {board.map((row, rowIndex) =>
          row.map((item, colIndex) => (
            <div
              key={rowIndex + colIndex}
              className={classNames(styles.cell, {
                [styles.black]: (colIndex + rowIndex) % 2 === 1,
                [styles.possible]: selected && selected.possibleMoves.move.find(p => p[0] === colIndex && p[1] === rowIndex),
                [styles.attack]: selected && selected.possibleMoves.attack.find(p => p[0] === colIndex && p[1] === rowIndex)
              })}
              onClick={() => handleClick(colIndex, rowIndex)}
            />
          ))
        )}

        {pieces.map(({ piece, position }) => (
          <div
            className={classNames(
              styles.piece,
              styles[piece.kind.toLowerCase()],
              styles[piece.color.toLowerCase()],
              {
                [styles.selected]:
                  selected &&
                  piece === selected.piece
              }
            )}
            style={{
              transform: `translate(${position[0] * 50}px, ${
                position[1] * 50
              }px)`,
            }}
            key={piece.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ChessGame;
