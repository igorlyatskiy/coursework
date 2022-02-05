import { createAction } from "@reduxjs/toolkit";
import { PartialMove } from "chess.ts";

export const GAME_START_GAME = 'GAME_START_GAME'
export const GAME_GET_VALID_MOVES = 'GAME_GET_VALID_MOVES'
export const GAME_MOVE_FIGURE = 'GAME_MOVE_FIGURE'

export const startGame = createAction<string, string>(GAME_START_GAME);
export const getValidMoves = createAction<string, string>(GAME_GET_VALID_MOVES)
export const moveFigure = createAction<PartialMove, string>(GAME_MOVE_FIGURE);