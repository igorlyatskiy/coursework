import { useDragLayer, XYCoord } from "react-dnd";
import { CSSProperties } from "react";

export const CustomDragLayer = ({ src }: { src: string }) => {
  const {
    isDragging,
    currentFileOffset,
  } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    currentFileOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          currentFileOffset,
        )}
      >
        <img src={src} alt="Figure preview" style={{ userSelect: 'none' }}/>
      </div>
    </div>
  );
};

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 20,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
};

function getItemStyles(
  currentOffset: XYCoord | null,
) {

  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const x = currentOffset.x
  const y = currentOffset.y
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    background: "transparent",
  };
}
