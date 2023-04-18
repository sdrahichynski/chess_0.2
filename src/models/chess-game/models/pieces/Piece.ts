import { BoardView, Color, Kind, Piece as TPiece, Position } from "../../types";

let counter = 0;

export abstract class Piece implements TPiece {
  readonly kind: Kind;
  readonly id: string;
  readonly color: Color;
  isMoved: boolean = false;

  constructor(color: Color, kind: Kind) {
    this.kind = kind;
    this.color = color;
    this.id = `${kind}-${counter++}`;
  }

  checkHorizontal(currentPosition: Position, targetPosition: Position, board: BoardView): boolean {
    const [currentCol, currentRow] = currentPosition;
    const [targetCol, targetRow] = targetPosition;

    if (currentRow !== targetRow) return false;

    const from = Math.min(currentCol, targetCol);
    const to = Math.max(currentCol, targetCol);

    for (let col = from + 1; col < to; col++) {
      if (board[col][currentRow] !== null) return false;
    }

    return true;
  }

  checkVertical(currentPosition: Position, targetPosition: Position, board: BoardView): boolean {
    const [currentCol, currentRow] = currentPosition;
    const [targetCol, targetRow] = targetPosition;

    if (currentCol !== targetCol) return false;

    const from = Math.min(currentRow, targetRow);
    const to = Math.max(currentRow, targetRow);

    for (let row = from + 1; row < to; row++) {
      if (board[currentCol][row] !== null) return false;
    }

    return true;
  }

  checkDiagonal(currentPosition: Position, targetPosition: Position, board: BoardView): boolean {
    const [currentCol, currentRow] = currentPosition;
    const [targetCol, targetRow] = targetPosition;

    if (Math.abs(currentCol - targetCol) !== Math.abs(currentRow - targetRow)) return false;

    const fromCol = currentCol;
    const toCol = targetCol;
    const dCol = currentCol < targetCol ? 1 : -1;

    const fromRow = currentRow;
    const toRow = targetRow;
    const dRow = currentRow < targetRow ? 1 : -1;

    for (let col = fromCol + dCol, row = fromRow + dRow; col !== toCol && row !== toRow; col += dCol, row += dRow ) {
      if (board[col][row] !== null) return false;
    }

    return true;
  }

  canMoveTo(currentPosition: Position, targetPosition: Position, board: BoardView): boolean {
    const targetPiece = board[targetPosition[0]][targetPosition[1]];
    if (targetPiece && targetPiece.kind === "King") return false;
    if (targetPiece && targetPiece.color === this.color) return false;

    return true;
  }
}
