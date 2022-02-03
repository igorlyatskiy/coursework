import { createAction } from "@reduxjs/toolkit";

export const GAME_START_GAME = 'GAME_START_GAME'

export const startGame = createAction<string, string>(GAME_START_GAME);