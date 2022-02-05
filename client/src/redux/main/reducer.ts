import { createReducer } from "@reduxjs/toolkit";

import ChessService from "../../chess.js/chess";
import { GAME_GET_VALID_MOVES, GAME_MOVE_FIGURE, GAME_START_GAME } from "./actions";
import { State } from "./type";

const chess = new ChessService()

const defaultState: State = {
  game: {
    chess,
    board: [ [] ],
    validMoves: []
  }
}

export const mainReducer = createReducer(defaultState, {
  [GAME_START_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = []
  },
  [GAME_GET_VALID_MOVES]: (state, { payload }) => {
    state.game.validMoves = state.game.chess.moves(payload);
    console.log(state.game.validMoves)
  },
  [GAME_MOVE_FIGURE]: (state, { payload }) => {
    state.game.chess.move(payload);
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
  }
});