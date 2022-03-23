import React from "react";

export default function SquareCircleLayout({ color }: { color: string }) {
  const SQUARE_LAYOUT_OPACITY = 0.2;
  return <div style={{
    background: 'transparent',
    opacity: SQUARE_LAYOUT_OPACITY,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    zIndex: '4',
    border: `8px solid ${color}`,
    position: "absolute",
  }}/>
}