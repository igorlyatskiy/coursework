import { Board } from "../../../Constants";
import GameFieldContainer from "./styled/GameFieldContainer";
import Square from "./Square/Square";

export default function GameField({ board }: { board: Board }) {

  return <GameFieldContainer>
    {board.map((row, rowIndex) => row.map((element, elementIndex) => {
        return <Square key={`${rowIndex} ${elementIndex}`} rowIndex={rowIndex} element={element}
                       elementIndex={elementIndex}/>
      })
    )}
  </GameFieldContainer>
}