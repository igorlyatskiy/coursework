import React from "react";
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

  const squareColor = (rowIndex + elementIndex) % 2 === 0 ? 'white' : 'rgb(1,50,32)'

  return <StyledSquare>
    <Figure element={element} elementIndex={elementIndex} rowIndex={rowIndex}/>
    <SquareColorLayout color={squareColor}/>
  </StyledSquare>
}