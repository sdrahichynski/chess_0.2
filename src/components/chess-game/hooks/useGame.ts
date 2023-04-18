import * as React from "react";
import { ChessGame, TChessGame } from "../../../models";

export const useGame = ():[TChessGame.GameState, ChessGame | undefined] => {
    const [gameState, setGameState] = React.useState<TChessGame.GameState>({
        pieces: [],
        board: [],
        check: false,
        checkMate: false,
        staleMate: false,
        selected: null,
    });
    const game = React.useMemo(() => {
        return new ChessGame(setGameState)
    }, [])

    return [gameState, game];
};