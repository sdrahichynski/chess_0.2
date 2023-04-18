import {Piece} from "./Piece";
import {BoardView, Color, Position} from "../../types";

export class Bishop extends Piece {
  constructor(color: Color) {
    super(color, "Bishop");
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
      if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

      return this.checkDiagonal(currentPosition, targetPosition, board);
  }
}
