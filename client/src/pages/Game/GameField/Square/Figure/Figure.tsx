import { Piece } from "chess.ts";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";

import useFigure from "./hooks/useFigure";
import { getValidMoves } from "../../../../../redux/main/actions";
import { getSquare, SQUARE_SIZE } from "../../../../../Constants";
import { State } from "../../../../../redux/main/type";
import { RootReducer } from "../../../../../redux";
import { CustomDragLayer } from "./CustomDragLayer";
import { Square } from "chess.ts/dist/types";

interface FigureProps {
  elementIndex: number;
  rowIndex: number;
  element: null | Piece
}

const checkDrag = (getMoves: (square: string) => Square[], squareName: string) => !!getMoves(squareName).length

export default function Figure({ elementIndex, rowIndex, element }: FigureProps) {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const dispatch = useDispatch()

  const squareName = getSquare(rowIndex, elementIndex)
  const figureSvgSrc = useFigure({ element });

  const { activePlayerColor, currentPlayerColor } = game;


  const [ { isDragging, canDrag }, drag, dragPreview ] = useDrag(() => ({
    type: 'figure',
    item: { square: squareName },
    canDrag: () => {
      const dragStatus = (checkDrag(game.chess.moves, squareName) && activePlayerColor === currentPlayerColor);
      if (dragStatus) {
        dispatch(getValidMoves(squareName));
      }
      return dragStatus
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: (checkDrag(game.chess.moves, squareName) && activePlayerColor === currentPlayerColor)
    }),
  }), [activePlayerColor, currentPlayerColor])

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  if (!element) {
    return null;
  }

  return <>
    <div style={{
      zIndex: '5',
      opacity: isDragging ? 0 : 1,
      cursor: canDrag ? "pointer" : "default",
      pointerEvents: canDrag ? "all" : "none",
      userSelect: "none",
      width: '100%',
      height: '100%',
      background: `url(${figureSvgSrc}) no-repeat 50% 50%`,
    }} ref={canDrag ? drag : null}/>
    {isDragging && <CustomDragLayer src={figureSvgSrc}/>}
  </>
}