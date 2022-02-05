import { Piece } from "chess.ts";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import useFigure from "./hooks/useFigure";
import { getValidMoves } from "../../../../../redux/main/actions";
import { FIGURES_COLORS_NAMES, getSquare } from "../../../../../Constants";
import { State } from "../../../../../redux/main/type";
import { RootReducer } from "../../../../../redux";

interface FigureProps {
  elementIndex: number;
  rowIndex: number;
  element: null | Piece
}

export default function Figure({ elementIndex, rowIndex, element }: FigureProps) {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const figureSvgName = useFigure({ element });

  const figureSvgSrc = `/img/svg/figures/${figureSvgName}${element?.color === FIGURES_COLORS_NAMES.black ? '_black' : ''}.svg`;
  const squareName = getSquare(rowIndex, elementIndex)

  const dispatch = useDispatch()

  const [ collected, drag, dragPreview ] = useDrag(() => ({
    type: 'figure',
    item: { square: squareName },
    canDrag: () => {
      const moves = game.chess.moves(squareName)
      if (!!moves.length) {
        dispatch(getValidMoves(squareName));
      }
      return !!moves.length
    }
  }))

  return <>
    {
      !!element && <>
        <DragPreviewImage connect={dragPreview} src={figureSvgSrc}/>
        <div style={{ zIndex: '10' }} ref={drag}>
          <img src={figureSvgSrc} alt="Figure" style={{ userSelect: 'none', transform: 'translate(0, 0)' }}/>
        </div>
      </>
    }

  </>
}