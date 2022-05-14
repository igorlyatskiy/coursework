import { FIGURES_COLORS_NAMES, FIGURES_NAMES } from "../../../../../../../Constants";
import { Piece } from "chess.ts";

interface GetFigureParams {
  element: Piece | null
}

const getFigureName = (element: Piece | null) => {
  if (element !== null) {
    switch (element.type) {
      case FIGURES_NAMES.BISHOP:
        return 'bishop';
      case FIGURES_NAMES.KING:
        return 'king';
      case FIGURES_NAMES.KNIGHT:
        return 'knight';
      case FIGURES_NAMES.PAWN:
        return 'pawn';
      case FIGURES_NAMES.QUEEN:
        return 'queen';
      case FIGURES_NAMES.ROOK:
        return 'rook';

      default:
        throw new Error('Default figure type expected')
    }
  }
}

export default function useFigure({ element }: GetFigureParams) {
  const figureSvgName = getFigureName(element);
  const figureColorString = element?.color === FIGURES_COLORS_NAMES.black ? '_black' : ''

  return`/img/svg/figures/${figureSvgName}${figureColorString}.svg`;
}