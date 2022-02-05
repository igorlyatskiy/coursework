import { FIGURES_NAMES } from "../../../../../../Constants";
import Bishop from "../../../../../../components/Figures/Bishop";
import King from "../../../../../../components/Figures/King";
import Knight from "../../../../../../components/Figures/Knight";
import Pawn from "../../../../../../components/Figures/Pawn";
import Queen from "../../../../../../components/Figures/Queen";
import Rook from "../../../../../../components/Figures/Rook";
import { Piece } from "chess.ts";

interface GetFigureParams {
  key: string,
  element: Piece | null
}

export default function useFigure({ key, element }: GetFigureParams) {
  if (element !== null) {
    switch (element.type) {
      case FIGURES_NAMES.BISHOP:
        return <Bishop key={key} color={element.color}/>;
      case FIGURES_NAMES.KING:
        return <King key={key} color={element.color}/>;
      case FIGURES_NAMES.KNIGHT:
        return <Knight key={key} color={element.color}/>;
      case FIGURES_NAMES.PAWN:
        return <Pawn key={key} color={element.color}/>;
      case FIGURES_NAMES.QUEEN:
        return <Queen key={key} color={element.color}/>;
      case FIGURES_NAMES.ROOK:
        return <Rook key={key} color={element.color}/>;

      default:
        return <div>Unexpected error</div>;
    }
  }
}