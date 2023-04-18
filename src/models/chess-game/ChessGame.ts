import {GamePiece, GameState, Position, PossibleMoves, Piece} from "./types";
import {Board, Pieces as P} from "./models";

/**
 * method make a move
 * every move recalculate possible moves for each piece for:
 *  - check, checkMate, staleMate
 *  - should recalculate all moves to check the king in danger
 *  -- store history for implementing "taking on the pass"
 *
 *  1) extend game state
 *  2)
 *
 */

class ChessGame {
  private update() {
    this.updateGameState(this.state);
  }

  constructor(private readonly updateGameState: (s: GameState) => void) {
    this.newGame();
  }

  board: Board = new Board();
  private selectedPiece: GamePiece | null = null;

  newGame() {
    this.board = new Board();
    this.arrangeBoard();
    this.update();
  }

  move(from: Position, to: Position) {
    const piece = this.board?.get(from);
    if (!piece) return;

    this.board?.remove(from);
    this.board?.put(to, piece);
    this.selectedPiece = null;
    piece.isMoved = true;
    this.update();
  }

  get state(): GameState {
    const pieces: GameState["pieces"] = [];
    this.board.array.forEach((row, rowIndex) => row.forEach((item, colIndex) => {
      if (item === null) return;
      pieces.push({
        piece: item,
        position: [colIndex, rowIndex],
        possibleMoves: {attack: [], move: []}
      })
    }))

    return {
      board: this.board.array,
      pieces: pieces.sort((p1, p2) => p1.piece.id > p2.piece.id ? 1 : -1),
      check: false,
      checkMate: false,
      staleMate: false,
      selected: this.selectedPiece,
    }
  }

  arrangeBoard() {
    const drawPawns = () => {
      for (let i = 0; i < 8; i++) {
        this.board.put([i, 1], new P.Pawn("Black"));
        this.board.put([i, 6], new P.Pawn("White"));
      }
    }

    const drawFigures = () => {
      this.board.put([0, 0], new P.Rock("Black"));
      this.board.put([1, 0], new P.Knight("Black"));
      this.board.put([2, 0], new P.Bishop("Black"));
      this.board.put([3, 0], new P.King("Black"));
      this.board.put([4, 0], new P.Queen("Black"));
      this.board.put([5, 0], new P.Bishop("Black"));
      this.board.put([6, 0], new P.Knight("Black"));
      this.board.put([7, 0], new P.Rock("Black"));

      this.board.put([0, 7], new P.Rock("White"));
      this.board.put([1, 7], new P.Knight("White"));
      this.board.put([2, 7], new P.Bishop("White"));
      this.board.put([3, 7], new P.King("White"));
      this.board.put([4, 7], new P.Queen("White"));
      this.board.put([5, 7], new P.Bishop("White"));
      this.board.put([6, 7], new P.Knight("White"));
      this.board.put([7, 7], new P.Rock("White"));
    }

    drawPawns();
    drawFigures();
  }

  possibleMoves(piece: Piece, position: Position): PossibleMoves {
    const possibleMoves: PossibleMoves = {
      attack: [],
      move: [],
    }

    this.board.board.forEach((col, colIndex) => col.forEach((target, rowIndex) => {
      const canMove = piece.canMoveTo(position, [colIndex, rowIndex], this.board.board);
      if (!canMove) return;
      if (target) possibleMoves.attack.push([colIndex, rowIndex])
      else possibleMoves.move.push([colIndex, rowIndex]);
    }));

    return possibleMoves;
  }

  selectPiece(position: Position) {
    const piece = this.board.get(position)
    this.selectedPiece = piece && {
      piece,
      position: position,
      possibleMoves: this.possibleMoves(piece, position),
    };
    this.update();
  }
}

export default ChessGame;