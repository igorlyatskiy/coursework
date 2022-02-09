import ChessService from "../../chess.js/chess";
import { Board } from "../../Constants";

export interface State {
  game: {
    chess: ChessService,
    board: Board,
    validMoves: string[],
  }
}