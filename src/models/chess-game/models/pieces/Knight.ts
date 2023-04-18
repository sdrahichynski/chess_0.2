import {Piece} from "./Piece";
import {BoardView, Color, Position} from "../../types";

export class Knight extends Piece {
  constructor(color: Color) {
    super(color, "Knight");
  }

  canMoveTo(
    currentPosition: Position,
    targetPosition: Position,
    board: BoardView
  ): boolean {
    if (!super.canMoveTo(currentPosition, targetPosition, board)) return false;

    const [ currentCol, currentRow ] = currentPosition;
    const [ targetCol, targetRow ] = targetPosition;

    const dCol = Math.abs(currentCol - targetCol);
    const dRow = Math.abs(currentRow - targetRow);

    return (dCol === 1 && dRow === 2) || (dCol === 2 && dRow === 1);
  }
}
