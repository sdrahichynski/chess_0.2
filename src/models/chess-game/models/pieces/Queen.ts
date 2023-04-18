import {Piece} from "./Piece";
import {BoardView, Color, Position} from "../../types";

export class Queen extends Piece {
  constructor(color: Color) {
    super(color, "Queen");
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
      if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

    return this.checkVertical(currentPosition, targetPosition, board)
      || this.checkHorizontal(currentPosition, targetPosition, board)
      || this.checkDiagonal(currentPosition, targetPosition, board);
  }
}
