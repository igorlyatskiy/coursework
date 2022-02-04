import { Piece } from "chess.ts";

import UseFigure from "./hooks/UseFigure";

interface FigureProps {
  elementIndex: number;
  rowIndex: number;
  element: null | Piece
}

export default function Figure({ elementIndex, rowIndex, element }: FigureProps) {
  const figureSvg = UseFigure({ key: `${elementIndex} ${rowIndex}`, element });

  return <div>{figureSvg}</div>
}