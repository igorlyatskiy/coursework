import getFigure from "./getFigure";
import { Board } from "../../../Constants";
import Square from './styled/Square'
import GameFieldContainer from "./styled/GameFieldContainer";

export default function GameField({ board }: { board: Board }) {
  const flatBoardArray = board.flat();

  return <GameFieldContainer>
    {
      flatBoardArray.map((figure, elementIndex) => {
        return <Square>
          {getFigure({ elementIndex, element: figure })}
        </Square>
      })
    }
  </GameFieldContainer>
}