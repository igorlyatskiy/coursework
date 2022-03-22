import { createAction } from "@reduxjs/toolkit";
import { PartialMove } from "chess.ts";

import {Session} from "../../components/WithSession";

export const APP_CONNECT = 'APP_CONNECT_SERVER'
export const APP_SET_SESSION = 'APP_SET_SESSION'

export const GAME_LEAVE_GAME = 'GAME_LEAVE_GAME'

export const GAME_APPROVE_START = 'GAME_APPROVE_START'
export const GAME_DENY_START = 'GAME_DENY_START';

export const GAME_GET_VALID_MOVES = 'GAME_GET_VALID_MOVES'
export const GAME_MOVE_FIGURE = 'GAME_MOVE_FIGURE'

export const ONLINE_MOVE_OPPONENT_FIGURE = 'ONLINE_MOVE_OPPONENT_FIGURE'
export const ONLINE_JOIN_GAME = 'ONLINE_JOIN_GAME'

export const OFFLINE_START_GAME = 'OFFLINE_START_GAME'
export const OFFLINE_APPROVE_START = 'OFFLINE_APPROVE_START'

export const AI_START_GAME = 'AI_START_GAME'
export const AI_MOVE_FIGURE = 'AI_MOVE_FIGURE'
export const AI_APPROVE_START = 'AI_APPROVE_START'

export const connectApp = createAction<void, string>(APP_CONNECT);
export const setSession = createAction<Session, string>(APP_SET_SESSION);

export const joinOnlineGame = createAction<string, string>(ONLINE_JOIN_GAME);
export const startOfflineGame = createAction<string, string>(OFFLINE_START_GAME);
export const startAiGame = createAction<string, string>(AI_START_GAME);

export const leaveGame = createAction<string, string>(GAME_LEAVE_GAME)

// TODO: Remove any types.
export const approveStartGame = createAction<any, string>(GAME_APPROVE_START);
export const approveOfflineGame = createAction<any, string>(OFFLINE_APPROVE_START);
export const approveAiGame = createAction<any, string>(AI_APPROVE_START);

export const denyStartGame = createAction<void, string>(GAME_DENY_START);

export const getValidMoves = createAction<string, string>(GAME_GET_VALID_MOVES)

export const moveFigure = createAction<PartialMove, string>(GAME_MOVE_FIGURE);
export const moveOpponentFigure = createAction<PartialMove, string>(ONLINE_MOVE_OPPONENT_FIGURE)
export const moveAiFigure = createAction<void, string>(AI_MOVE_FIGURE)


// Not in use for now.
export const START_FIGURE_MOVEMENT = 'START_FIGURE_MOVEMENT'
export const STOP_FIGURE_MOVEMENT = 'STOP_FIGURE_MOVEMENT'
export const startFigureMovement = createAction<void, string>(START_FIGURE_MOVEMENT)
export const stopFigureMovement = createAction<void, string>(STOP_FIGURE_MOVEMENT)