import {Piece} from "./Piece";
import {BoardView, Color, Position} from "../../types";

export class King extends Piece {
  constructor(color: Color) {
    super(color, "King");
  }

  isUnderAttack (position: Position, board: BoardView): boolean {
    return !board.flat().filter((piece, index) => {
      if (!piece || piece.color === this.color) return false;
      const col = Math.floor(index / 8); // board flat fatten by columns
      const row = index % 8;
      return piece.canMoveTo([col, row], position, board);
    }).length;
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
    if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

    const [currentCol, currentRow] = currentPosition;
    const [targetCol, targetRow] = targetPosition;

    if (Math.abs(currentCol - targetCol) > 1 || Math.abs(currentRow - targetRow) > 1) return false;

    // todo 0-0, 0-0-0

    return this.isUnderAttack(targetPosition, board);
  }
}
