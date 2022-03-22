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

export const SERVER_URI: string = process.env.REACT_APP_SERVER_URI as string;

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
  numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1]

  rowNumbers = 8;
}

const constantsInstance = new Constants();

export default constantsInstance

export const getSquare = (rowIndex: number, colIndex: number) => constantsInstance.letters[colIndex] + constantsInstance.numbers[rowIndex]

export const getColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'green';
    case 'Champion':
      return 'purple';
    case 'Hero':
      return 'orange';
    case 'Admin':
      return 'black';
    default:
      return 'gray'
  }
};