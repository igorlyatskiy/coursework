import React from "react";

export default function SquareColorLayout({ color }: { color: string }) {
  const SQUARE_LAYOUT_OPACITY = 0.6;
  return <div style={{background: color, opacity: SQUARE_LAYOUT_OPACITY, width: "100%", height: '100%', position: "absolute", zIndex: '2'}}/>
}