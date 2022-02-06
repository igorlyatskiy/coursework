import { Piece } from "chess.ts";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";

import useFigure from "./hooks/useFigure";
import { getValidMoves } from "../../../../../redux/main/actions";
import { FIGURES_COLORS_NAMES, getSquare } from "../../../../../Constants";
import { State } from "../../../../../redux/main/type";
import { RootReducer } from "../../../../../redux";
import { CustomDragLayer } from "./CustomDragLayer";

interface FigureProps {
  elementIndex: number;
  rowIndex: number;
  element: null | Piece
}

export default function Figure({ elementIndex, rowIndex, element }: FigureProps) {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const dispatch = useDispatch()

  const squareName = getSquare(rowIndex, elementIndex)
  const figureSvgSrc = useFigure({ element });

  const [ { isDragging }, drag, dragPreview ] = useDrag(() => ({
    type: 'figure',
    item: { square: squareName },
    canDrag: () => {
      const moves = game.chess.moves(squareName)
      if (!!moves.length) {
        dispatch(getValidMoves(squareName));
      }
      return !!moves.length
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  if (!element) {
    return null;
  }

  return <>
    <div style={{ zIndex: '5' }} ref={drag}>
      <img
        src={figureSvgSrc}
        alt="Figure"
        style={{ userSelect: 'none', opacity: `${isDragging ? 0 : 1}` }}
      />
    </div>

    {isDragging && <CustomDragLayer src={figureSvgSrc}/>}
  </>
}