import { Piece } from "./Piece";
import { BoardView, Color, Position } from "../../types";

export class Rock extends Piece {
  constructor(color: Color) {
    super(color, "Rock");
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
    if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

    return this.checkHorizontal(currentPosition, targetPosition, board) || this.checkVertical(currentPosition, targetPosition, board);
  }
}
