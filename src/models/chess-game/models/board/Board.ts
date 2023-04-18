/**
 *
 *   DRAFT
 *
 * */

import {Piece, Position} from "../../types";

class Board {
    board: (Piece | null)[][] = [];

    private createBoard(xSize: number, ySize: number) {
        for (let col = 0; col < xSize; col++) {
            for (let row = 0; row < ySize; row++) {
                if (!this.board[col]) this.board[col] = [];
                this.board[col][row] = null;
            }
        }
    }

    constructor(xSize: number = 8, ySize: number = 8) {
        this.createBoard(xSize, ySize);
    }

    put ([col, row]: Position, value: Piece) {
        // check if cell is already busy
        this.board[col][row] = value;
    }

    remove ([col, row]: Position) {
        this.board[col][row] = null;
    }

    get ([col, row]: Position) {
        return this.board[col][row];
    }

    get array () {
        return this.board[0].map((value, rowIndex) => this.board.map((col, colIndex) => this.board[colIndex][rowIndex]))
    }

    log() {
        return this.board[0].map((value, rowIndex) => this.board.map((col, colIndex) => this.board[colIndex][rowIndex]))
    }
}

export default Board;