import { createReducer } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

import ChessService from "../../chess.js/chess";
import {
  APP_CONNECT,
  APP_SET_SESSION,
  GAME_APPROVE_START,
  GAME_GET_VALID_MOVES,
  GAME_JOIN_GAME, GAME_LEAVE_GAME,
  GAME_MOVE_FIGURE,
} from "./actions";
import { State } from "./type";

const chess = new ChessService()
export const wsIo = io('http://localhost:8080')

const defaultState: State = {
  game: {
    chess,
    board: [ [] ],
    validMoves: [],
    isGameActive: false,
    activePlayerColor: 'w',
    roomId: null,
  },
  app: {
    isServerConnected: false,
    session: null
  }
}

export const mainReducer = createReducer(defaultState, {
  [APP_CONNECT]: (state) => {
    state.app.isServerConnected = true;
  },
  [APP_SET_SESSION]: (state, { payload }) => {
    state.app.session = payload;
  },
  [GAME_JOIN_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    wsIo.emit('joinGame', payload);
  },
  [GAME_LEAVE_GAME]: (state, {payload})=>{
    wsIo.emit('leaveGame', payload);
    state.game.isGameActive = false;
  },
  [GAME_APPROVE_START]: (state) => {
    state.game.isGameActive = true;
  },
  [GAME_GET_VALID_MOVES]: (state, { payload }) => {
    state.game.validMoves = state.game.chess.moves(payload);
    console.log(state.game.validMoves);
  },
  [GAME_MOVE_FIGURE]: (state, { payload }) => {
    state.game.chess.move(payload);
    state.game.chess.turn();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    state.game.activePlayerColor = state.game.chess.activePlayer;
  }
});