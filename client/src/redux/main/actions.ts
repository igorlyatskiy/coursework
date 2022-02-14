import { createAction } from "@reduxjs/toolkit";
import { PartialMove } from "chess.ts";

import {Session} from "../../components/WithSession";

export const APP_CONNECT = 'APP_CONNECT_SERVER'
export const APP_SET_SESSION = 'APP_SET_SESSION'

export const GAME_START_GAME = 'GAME_START_GAME'

export const GAME_APPROVE_START = 'GAME_APPROVE_START'
export const GAME_DENY_START = 'GAME_DENY_START';

export const GAME_GET_VALID_MOVES = 'GAME_GET_VALID_MOVES'
export const GAME_MOVE_FIGURE = 'GAME_MOVE_FIGURE'


export const connectApp = createAction<void, string>(APP_CONNECT);
export const setSession = createAction<Session, string>(APP_SET_SESSION);

export const startGame = createAction<string, string>(GAME_START_GAME);

export const approveStartGame = createAction<void, string>(GAME_APPROVE_START);
export const denyStartGame = createAction<void, string>(GAME_DENY_START);

export const getValidMoves = createAction<string, string>(GAME_GET_VALID_MOVES)
export const moveFigure = createAction<PartialMove, string>(GAME_MOVE_FIGURE);