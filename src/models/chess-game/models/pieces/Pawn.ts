import {Piece} from "./Piece";
import {BoardView, Color, Position} from "../../types";

export class Pawn extends Piece {
  constructor(color: Color) {
    super(color, "Pawn");
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
    if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

    const [currentCol, currentRow] = currentPosition;
    const [targetCol, targetRow] = targetPosition;


    const direction = this.color === "Black" ? 1 : -1;
    const distance = this.isMoved ? 1 : 2;

    if (targetRow === currentRow + direction && Math.abs(currentCol - targetCol) === 1 && board[targetCol][targetRow])
      return true;

    if (currentCol !== targetCol || Math.abs(currentRow - targetRow) > distance) return false;

    for (let row = currentRow + direction; row !== targetRow + direction; row += direction) {
      if (board[currentCol][row] !== null) return false;
    }

    return true;
  }
}
