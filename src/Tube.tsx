import { Bubble } from "./Bubble.tsx";
import { MouseEventHandler } from "react";

export function Tube({
  tube,
  isActive = false,
  onClick,
}: {
  isActive: boolean;
  tube: number[];
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      style={{
        width: "3em",
        height: "13em",
        background: "linear-gradient(to bottom, #aaa 0%, #888 50%, #aaa 100%)",
        borderRadius: "0 0 30px 30px",
        border: "3px solid #fff",
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse",
        justifyContent: "flex-start",
        paddingBottom: "0.5em",
        gap: "0.25em",
      }}
      onClick={onClick}
    >
      {tube.map((bubble, index) => (
        <Bubble
          key={index}
          color={bubble}
          isActive={isActive && index === tube.length - 1}
        />
      ))}
    </div>
  );
}
