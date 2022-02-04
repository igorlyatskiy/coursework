import { Piece } from "chess.ts";

import UseFigure from "./hooks/UseFigure";
import { useDrag } from "react-dnd";

interface FigureProps {
  elementIndex: number;
  rowIndex: number;
  element: null | Piece
}

export default function Figure({ elementIndex, rowIndex, element }: FigureProps) {
  const unicId = `${elementIndex} ${rowIndex}`

  const figureSvg = UseFigure({ key: unicId, element });

  const [ collected, drag, dragPreview ] = useDrag(() => ({
    type: 'figure',
    item: { id: unicId }
  }))

  return <div style={{ zIndex: '10' }} ref={drag}>{figureSvg}</div>
}