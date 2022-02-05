import React from "react";

export default function SquareDotLayout({ color }: { color: string }) {
  const SQUARE_LAYOUT_OPACITY = 0.3;
  return <div style={{
    background: color,
    opacity: SQUARE_LAYOUT_OPACITY,
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    zIndex: '4',
    position: "absolute",
  }}/>
}