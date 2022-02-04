import { createReducer } from "@reduxjs/toolkit";

import ChessService from "../../chess.js/chess";
import { GAME_START_GAME } from "./actions";
import { State } from "./type";

const chess = new ChessService()

const defaultState: State = {
  game: {
    chess,
    board: [ [] ]
  }
}

export const mainReducer = createReducer(defaultState, {
  [GAME_START_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
  }
});