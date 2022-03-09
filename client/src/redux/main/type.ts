import ChessService from "../../chess.js/chess";
import { Board } from "../../Constants";
import { Session } from "../../components/WithSession";
import { Color } from "chess.ts";

export interface State {
  game: {
    chess: ChessService,
    board: Board,
    validMoves: string[],
    isGameActive: boolean,
    isGameFinished: boolean,
    activePlayerColor: Color,
    currentPlayerColor: Color | null,
    roomId: string | null,
  },
  app: {
    isServerConnected: boolean,
    session: Session | null
  }
}