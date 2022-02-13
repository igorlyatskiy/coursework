import { createReducer } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

import ChessService from "../../chess.js/chess";
import { APP_CONNECT, GAME_APPROVE_START, GAME_GET_VALID_MOVES, GAME_MOVE_FIGURE, GAME_START_GAME } from "./actions";
import { State } from "./type";

const chess = new ChessService()
export const wsIo = io('http://localhost:8080')

const defaultState: State = {
  game: {
    chess,
    board: [ [] ],
    validMoves: [],
    isGameActive: false,
  },
  app: {
    isServerConnected: false,
  }
}

export const mainReducer = createReducer(defaultState, {
  [APP_CONNECT]: (state) => {
    state.app.isServerConnected = true;
  },
  [GAME_START_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    wsIo.emit('joinGame', payload);
  },
  [GAME_APPROVE_START]: (state)=>{
    state.game.isGameActive = true;
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