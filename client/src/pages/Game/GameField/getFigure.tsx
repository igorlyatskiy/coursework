import { FIGURES_NAMES } from "../../../Constants";
import Bishop from "../../../components/Figures/Bishop";
import King from "../../../components/Figures/King";
import Knight from "../../../components/Figures/Knight";
import Pawn from "../../../components/Figures/Pawn";
import Queen from "../../../components/Figures/Queen";
import Rook from "../../../components/Figures/Rook";

interface GetFigureParams {
  elementIndex: number,
  element: any
}

export default function getFigure({elementIndex, element}: GetFigureParams) {
  if (element !== null) {
    switch (element.type) {
      case FIGURES_NAMES.BISHOP:
        return <Bishop key={elementIndex} color={element.color}/>;
      case FIGURES_NAMES.KING:
        return <King key={elementIndex} color={element.color}/>;
      case FIGURES_NAMES.KNIGHT:
        return <Knight key={elementIndex} color={element.color}/>;
      case FIGURES_NAMES.PAWN:
        return <Pawn key={elementIndex} color={element.color}/>;
      case FIGURES_NAMES.QUEEN:
        return <Queen key={elementIndex} color={element.color}/>;
      case FIGURES_NAMES.ROOK:
        return <Rook key={elementIndex} color={element.color}/>;

      default:
        return <div>Unexpected error</div>;
    }
  }
}