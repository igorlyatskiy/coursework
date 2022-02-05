import React from "react";
import { useDrop } from "react-dnd";
import { Piece } from "chess.ts";

import StyledSquare from './styled/Square'
import SquareColorLayout from "./SquareLayouts/SquareColorLayout";
import Figure from './Figure/Figure'
import { getSquare } from "../../../../Constants";
import { State } from "../../../../redux/main/type";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../redux";
import SquareDotLayout from "./SquareLayouts/SquareDotLayout";
import { moveFigure } from "../../../../redux/main/actions";
import SquareCircleLayout from "./SquareLayouts/SquareCircleLayout";

interface SquareProps {
  rowIndex: number;
  elementIndex: number;
  element: Piece | null;
}

export default function Square({ rowIndex, elementIndex, element }: SquareProps) {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);

  const squareColor = (rowIndex + elementIndex) % 2 === 0 ? '#fff' : 'rgb(1,50,32)'
  const isOverColor = 'yellow';
  const canDropColor = 'green'

  const squareName = getSquare(rowIndex, elementIndex);
  const validMoves = game.validMoves;

  const move = game.validMoves.find((move) => move.includes(squareName));
  const isPromotion = !!move?.match(/[a-z][1-8]x=/)
  const isOnlyAggressiveMove = !!move?.match(/[a-z][1-8]x/)

  const dispatch = useDispatch();

  const [ { isOver, canDrop }, drop ] = useDrop(() => ({
    accept: 'figure',
    canDrop: (item: { square: string }) => {
      return !!game.chess.moves(item.square).find((move) => move.includes(squareName));
    },
    drop: (item) => {
      dispatch(moveFigure({ from: item.square, to: squareName, promotion: 'q' }))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  return <StyledSquare ref={drop}>
    <Figure element={element} elementIndex={elementIndex} rowIndex={rowIndex}/>
    {<SquareColorLayout color={squareColor}/>}
    {/*{isOver && !canDrop && <SquareColorLayout color={isOverColor}/>}*/}
    {!isPromotion && canDrop && !isOnlyAggressiveMove && <SquareDotLayout color='black'/>}
    {canDrop && isOnlyAggressiveMove && <SquareCircleLayout color='black'/>}
    {isPromotion && <SquareCircleLayout color='orange'/>}
  </StyledSquare>
}