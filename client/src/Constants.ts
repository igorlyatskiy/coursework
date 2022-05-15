import { Piece } from "chess.ts";

export type Color = 'b' | 'w'

export type Board = (Piece | null)[][]

export enum FIGURES_COLORS_NAMES {
  white = 'w',
  black = 'b'
}

export enum GAME_TYPES {
  online = 'pvp-online',
  offline = 'pvp-offline',
  ai = 'ai',
}

export enum AI_LEVEL {
  easy = 1,
  medium = 2,
  hard = 3,
}

export const DEFAULT_AI_LEVEL = AI_LEVEL.medium;

export const SERVER_URI: string = process.env.REACT_APP_SERVER_URI as string;

export const JWT_FIELD_NAME = 'jwt_token';
export const LOGOUT_QUERY_PARAM = 'logout';

export const FIGURE_MOVING_TIME = 300;

export const SQUARE_SIZE = 100

export enum FIGURES_NAMES {
  BISHOP = 'b',
  KING = 'k',
  KNIGHT = 'n',
  PAWN = 'p',
  QUEEN = 'q',
  ROOK = 'r'
}

class Constants {
  letters: string[] = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
  numbers: number[] = [ 8, 7, 6, 5, 4, 3, 2, 1 ]

  rowNumbers = 8;
}

const constantsInstance = new Constants();

export default constantsInstance

export const getSquare = (rowIndex: number, colIndex: number) => constantsInstance.letters[colIndex] + constantsInstance.numbers[rowIndex]

export enum PLAYERS_LEVELS {
  beginner = 'Beginner',
  champion = 'Champion',
  hero = 'Hero',
  admin = 'Admin',
}

export enum USERS_ROLES {
  user = 'user',
  admin = 'admin'
}

export const getLevelColor = (level: string) => {
  switch (level) {
    case PLAYERS_LEVELS.beginner:
      return 'green';
    case PLAYERS_LEVELS.champion:
      return 'purple';
    case PLAYERS_LEVELS.hero:
      return 'orange';
    case PLAYERS_LEVELS.admin:
      return 'black';
    default:
      return 'gray'
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case USERS_ROLES.user:
      return 'orange'
    case USERS_ROLES.admin:
      return 'red'
    default:
      return 'gray'
  }
}