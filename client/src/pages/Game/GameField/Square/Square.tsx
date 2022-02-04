import React from "react";
import { useDrop } from "react-dnd";
import { Piece } from "chess.ts";

import StyledSquare from './styled/Square'
import SquareColorLayout from "./SquareLayouts/SquareColorLayout";
import Figure from './Figure/Figure'

interface SquareProps {
  rowIndex: number;
  elementIndex: number;
  element: Piece | null;
}

export default function Square({ rowIndex, elementIndex, element }: SquareProps) {

  const squareColor = (rowIndex + elementIndex) % 2 === 0 ? '#fff' : 'rgb(1,50,32)'

  const [ { isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'figure',
    canDrop: () => true,
    drop: () => console.log(rowIndex, elementIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  return <StyledSquare ref={drop}>
    <Figure element={element} elementIndex={elementIndex} rowIndex={rowIndex}/>
    <SquareColorLayout color={squareColor}/>
  </StyledSquare>
}