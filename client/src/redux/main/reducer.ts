import { createReducer } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { message } from "antd";
import Cookies from 'js-cookie';

import ChessService from "../../chess.js/chess";
import {
  APP_CONNECT,
  APP_SET_SESSION,
  GAME_APPROVE_START,
  GAME_GET_VALID_MOVES,
  GAME_JOIN_GAME, GAME_LEAVE_GAME,
  GAME_MOVE_FIGURE, ONLINE_MOVE_OPPONENT_FIGURE,
} from "./actions";
import { State } from "./type";

const chess = new ChessService()
export const wsIo = io('http://localhost:8080', {
  extraHeaders: {
    JWT_TOKEN: Cookies.get('JWT_TOKEN') || ''
  }
});

const defaultState: State = {
  game: {
    chess,
    board: [ [] ],
    validMoves: [],
    isGameActive: false,
    isGameFinished: false,
    activePlayerColor: 'w',
    currentPlayerColor: null,
    roomId: null,
  },
  app: {
    isServerConnected: false,
    session: null,
    offlineGameType: null
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
    state.game.roomId = payload;
    state.game.isGameFinished = false;
    wsIo.emit('joinGame', { roomId: payload });
  },
  [GAME_LEAVE_GAME]: (state, { payload }) => {
    wsIo.emit('leaveGame', { roomId: payload });
    state.game.isGameActive = false;
  },
  [GAME_APPROVE_START]: (state, { payload }) => {
    state.game.isGameActive = true;
    const isWhite = state?.app?.session?.userId === payload.whitePlayer;
    state.game.currentPlayerColor = isWhite ? 'w' : 'b';
    message.info(`You are playing as ${isWhite ? 'white' : 'black'}`);
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
    state.game.isGameFinished = !state.game.chess.isGameActive()
    wsIo.emit('moveFigure', { ...payload, gameId: state.game.roomId, isGameFinished: state.game.isGameFinished });

    if (state.game.isGameFinished) {
      wsIo.emit('finishGame', { gameId: state.game.roomId, winnerId: state?.app?.session?.userId })
      message.success("Game is finished!")
    }
  },
  [ONLINE_MOVE_OPPONENT_FIGURE]: (state, { payload }) => {
    const { move, isGameFinished } = payload;
    if (state.game.chess.move(move)) {
      state.game.chess.turn();
      state.game.board = state.game.chess.board();
      state.game.validMoves = [];
      state.game.activePlayerColor = state.game.chess.activePlayer;
      state.game.isGameFinished = isGameFinished;
      if (state.game.isGameFinished) {
        message.error("Game is finished!")
      }
    }
  }
});