import ChessService from "../../chess.js/chess";
import { AI_LEVEL, Board, GAME_TYPES } from "../../Constants";
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
    gameId: string | null,
    currentGameType: GAME_TYPES | null,
    isFigureMoving: boolean,
    aiLevel: AI_LEVEL | null,
  },
  app: {
    isServerConnected: boolean,
    session: Session | null,
  }
}