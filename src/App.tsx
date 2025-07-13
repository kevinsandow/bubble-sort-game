import { Tube } from "./Tube.tsx";
import { useState } from "react";

const allBubbles = [
  0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6,
  6, 6, 7, 7, 7, 7,
];

function getRandomConfiguration() {
  const bubbles = [...allBubbles];
  const result: number[][] = new Array(10).fill(0).map(() => []);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      const randomIndex = Math.floor(Math.random() * bubbles.length);
      result[i].push(bubbles[randomIndex]);
      bubbles.splice(randomIndex, 1);
    }
  }

  return result;
}

function App() {
  const [gameState, setGameState] = useState<{
    activeTube: number | undefined;
    tubes: number[][];
  }>(() => ({
    activeTube: undefined,
    tubes: getRandomConfiguration(),
  }));

  const reset = () =>
    setGameState({
      activeTube: undefined,
      tubes: getRandomConfiguration(),
    });

  const onClick = (tube: number) => {
    setGameState((state) => {
      if (state.activeTube === undefined && state.tubes[tube].length === 0) {
        return state;
      }

      if (state.activeTube === undefined) {
        return { ...state, activeTube: tube };
      }

      if (state.activeTube === tube) {
        return { ...state, activeTube: undefined };
      }

      if (state.tubes[tube].length === 4) {
        return { ...state, activeTube: tube };
      }

      if (state.activeTube !== undefined && state.tubes[tube].length === 4) {
        return state;
      }

      const tubes = state.tubes.map((x) => [...x]);
      if (state.activeTube !== undefined && state.tubes[tube].length === 0) {
        tubes[tube].push(tubes[state.activeTube].pop()!);
        return {
          activeTube: undefined,
          tubes,
        };
      }

      if (
        state.activeTube !== undefined &&
        state.tubes[state.activeTube].slice(-1)[0] ===
          state.tubes[tube].slice(-1)[0]
      ) {
        tubes[tube].push(tubes[state.activeTube].pop()!);
        return {
          activeTube: undefined,
          tubes,
        };
      }

      return state;
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
          paddingBottom: "2em",
        }}
      >
        {gameState.tubes.map((tube, index) => (
          <Tube
            key={`tube-${index}-${tube.join("-")}`}
            isActive={index === gameState.activeTube}
            tube={tube}
            onClick={() => onClick(index)}
          />
        ))}
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
