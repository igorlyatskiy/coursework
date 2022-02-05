import { Piece } from "chess.ts";

export type Color = 'b' | 'w'

export type Board = (Piece | null)[][]

export enum FIGURES_COLORS_NAMES {
  white = 'w',
  black = 'b'
}

export enum FIGURES_NAMES {
  BISHOP = 'b',
  KING = 'k',
  KNIGHT = 'n',
  PAWN = 'p',
  QUEEN = 'q',
  ROOK = 'r'
}

export interface FigureData {
  type: FIGURES_NAMES,
  color: Color
}

interface PlayerData {
  id: number,
  name: string,
  image: string | null,
  color: Color
}

class Constants {
  APP_PAGES = {
    MAIN: 'main',
    GAME: 'game',
    ALL_REPLAYS: 'replays-page',
    SETTINGS: 'settings',
    REPLAY: 'replay',
    ONLINE: 'online',
  }
  FIGURE_MOVEMENT_TIME = 300;
  FIGURE_WAITING_TIME = 0;
  NOT_AI_PLAYER_ID = 1;
  PVP_OFFLINE_NAME = 'pvp-offline'
  PVP_ONLINE_NAME = 'pvp-online'
  AI_NAME = 'ai'

  letters: string[] = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
  numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1]

  defaultPlayers: PlayerData[] = [
    {
      name: 'Player 1',
      id: 1,
      image: null,
      color: 'w'
    },
    {
      name: 'Player 2',
      id: 2,
      image: null,
      color: 'b'
    }
  ];
  startTimeValue = -1;
  squareSize = 91;
  rowNumbers = 8;
  BOARD_ROTATION_TIME = 1200
  PROMOTION_WAITING_TIME = 10000;
  SUCCESS_RESPONCE_STATUS = 200;
}

const constantsInstance = new Constants();

export default constantsInstance

export const getSquare = (rowIndex: number, colIndex: number) => constantsInstance.letters[colIndex] + constantsInstance.numbers[rowIndex]
