import { useEffect, useState } from "react";
import { VIEWS } from ".";
import { SafeDial } from "../components/SafeDial";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function Start({ setView }) {
  const [random, setRandom] = useState(0);
  useEffect(() => {
    const handle = setTimeout(() => {
      setRandom(getRandomInt(40));
    }, 3000);
    return () => clearTimeout(handle);
  }, [random]);
  return (
    <div className="game-container">
      <SafeDial current={random} numOfOptions={40} />

      <button className="start" onClick={() => setView(VIEWS.PLAY)}>
        Start
      </button>
    </div>
  );
}
