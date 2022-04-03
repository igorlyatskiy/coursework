import { createReducer } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { message } from "antd";
import Cookies from 'js-cookie';
import { PartialMove } from "chess.ts";

import ChessService from "../../chess.js/chess";
import {
  AI_APPROVE_START,
  AI_MOVE_FIGURE,
  AI_START_GAME,
  APP_CONNECT,
  APP_SET_SESSION,
  GAME_APPROVE_START,
  GAME_GET_VALID_MOVES,
  GAME_LEAVE_GAME,
  GAME_MOVE_FIGURE,
  OFFLINE_APPROVE_START,
  OFFLINE_START_GAME,
  ONLINE_JOIN_GAME,
  ONLINE_MOVE_OPPONENT_FIGURE, START_FIGURE_MOVEMENT, StartAiGamePayload, STOP_FIGURE_MOVEMENT,
} from "./actions";
import { State } from "./type";
import { DEFAULT_AI_LEVEL, GAME_TYPES, SERVER_URI } from "../../Constants";

const chess = new ChessService()
export const wsIo = io(SERVER_URI, {
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
    gameId: null,
    currentGameType: null,
    isFigureMoving: false,
    aiLevel: null,
  },
  app: {
    isServerConnected: false,
    session: null,
  }
}

export const mainReducer = createReducer(defaultState, {
  [APP_CONNECT]: (state) => {
    state.app.isServerConnected = true;
  },
  [APP_SET_SESSION]: (state, { payload }) => {
    state.app.session = payload;
  },

  [ONLINE_JOIN_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    state.game.gameId = payload;
    state.game.isGameFinished = false;
    wsIo.emit(`joinGame__${GAME_TYPES.online}`, { roomId: payload });
  },
  [OFFLINE_START_GAME]: (state, { payload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    state.game.isGameFinished = false;
    state.game.currentGameType = payload;
    wsIo.emit(`joinGame__${payload}`);
  },
  [AI_START_GAME]: (state, { payload }: { payload: StartAiGamePayload }) => {
    state.game.chess.reset();
    state.game.board = state.game.chess.board();
    state.game.validMoves = [];
    state.game.isGameFinished = false;
    state.game.currentGameType = payload.activeGameType;
    state.game.aiLevel = payload.aiLevel;
    wsIo.emit(`joinGame__${payload.activeGameType}`, { aiLevel: payload.aiLevel });
  },

  [GAME_LEAVE_GAME]: (state, { payload }) => {
    wsIo.emit(`leaveGame__${GAME_TYPES.online}`, { roomId: payload });
    state.game.isGameActive = false;
  },

  [GAME_APPROVE_START]: (state, { payload }) => {
    state.game.isGameActive = true;
    const isWhite = state?.app?.session?.userId === payload.whitePlayer;
    state.game.currentPlayerColor = isWhite ? 'w' : 'b';
    state.game.activePlayerColor = 'w';
    state.game.currentGameType = GAME_TYPES.online;
    message.info(`You are playing as ${isWhite ? 'white' : 'black'}`);
  },
  [OFFLINE_APPROVE_START]: (state, { payload }) => {
    state.game.isGameActive = true;
    state.game.currentPlayerColor = 'w';
    state.game.activePlayerColor = 'w';
    state.game.gameId = payload.gameId;
    message.info(`White player begins!`);
  },
  [AI_APPROVE_START]: (state, { payload }) => {
    state.game.isGameActive = true;
    state.game.currentPlayerColor = 'w';
    state.game.activePlayerColor = 'w';
    state.game.gameId = payload.gameId;
    message.info(`You begin!`);
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

    if (state.game.currentGameType === GAME_TYPES.offline) {
      state.game.currentPlayerColor = state.game.activePlayerColor;
    }

    wsIo.emit(`moveFigure__${state.game.currentGameType}`, {
      ...payload,
      gameId: state.game.gameId,
      isGameFinished: state.game.isGameFinished
    });

    if (state.game.isGameFinished) {
      const isDraw = state.game.chess.isDraw();

      if (isDraw) {
        message.info("Draw!");
      } else {
        message.info("Game is finished!")
      }

      wsIo.emit(`finishGame__${state.game.currentGameType}`, {
        gameId: state.game.gameId,
        winnerId: state?.app?.session?.userId,
        winnerColor: state.game.activePlayerColor,
        isDraw
      })
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
  },
  [AI_MOVE_FIGURE]: (state, { payload }) => {
    const move = state.game.chess.moveAI(state.game.aiLevel || DEFAULT_AI_LEVEL);
    if (move) {
      state.game.chess.move(move as PartialMove);
      state.game.board = state.game.chess.board();
      state.game.chess.turn();
      state.game.validMoves = [];
      state.game.activePlayerColor = state.game.chess.activePlayer;
      state.game.isGameFinished = !state.game.chess.isGameActive();
      if (state.game.isGameFinished) {
        message.error("AI game is finished!")
      }
    }
  },


  // Not in use.
  [START_FIGURE_MOVEMENT]: (state) => {
    state.game.isFigureMoving = true
  },
  [STOP_FIGURE_MOVEMENT]: (state) => {
    state.game.isFigureMoving = false;
  },
});