import ChessService from "../../chess.js/chess";
import { Board } from "../../Constants";
import { Session } from "../../components/WithSession";

export interface State {
  game: {
    chess: ChessService,
    board: Board,
    validMoves: string[],
    isGameActive: boolean
  },
  app: {
    isServerConnected: boolean,
    session: Session | null
  }
}