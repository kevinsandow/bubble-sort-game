const colors = [
  "#e6194B",
  "#f58231",
  "#ffe119",
  "#bfef45",
  "#3cb44b",
  "#42d4f4",
  "#4363d8",
  "#911eb4",
  "#f032e6",
];

export function Bubble({
  isActive = false,
  color,
}: {
  isActive: boolean;
  color: number;
}) {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "0.1em solid #000",
        backgroundColor: colors[color],
        ...(isActive
          ? {
              marginBottom: "1em",
            }
          : {}),
      }}
    ></div>
  );
}
