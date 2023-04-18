
export type Color = "Black" | "White";
export type Kind = "Pawn" | "Rock" | "Knight" | "Bishop" | "King" | "Queen";
export type BoardView = (Piece | null)[][];
export type Position = [number, number];



export interface PossibleMoves {
    attack: Position[],
    move: Position[],
}

export interface Piece {
    id: string | number,
    color: Color,
    kind: Kind,
    canMoveTo: (currentPosition: Position, targetPosition: Position, board: BoardView) => boolean,
    isMoved: boolean,
}

export interface GamePiece {
    piece: Piece,
    position: Position,
    possibleMoves: PossibleMoves,
}

export interface GameState {
    pieces: GamePiece[],
    board: BoardView,
    check: Boolean,
    checkMate: Boolean,
    staleMate: Boolean,
    selected: GamePiece | null,
}