import { useEffect, useState } from "react";
import { VIEWS } from ".";
import { SafeDial } from "../components/SafeDial";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function Finish({ setView, finishMsg }) {
  const [random, setRandom] = useState(0);
  useEffect(() => {
    const handle = setTimeout(() => {
      setRandom(getRandomInt(40));
    }, 2000);
    return () => clearTimeout(handle);
  }, [random]);
  return (
    <div className="game-container">
      <SafeDial current={random} numOfOptions={40} />
      {/* <h1>{finishMsg.title}</h1>
      <h3 id="result">{finishMsg.subtitle}</h3> */}
      <button className="again" onClick={() => setView(VIEWS.PLAY)}>
        play again?
      </button>
      {/* <button className="nope" onClick={() => setView(VIEWS.START)}>
        I dont want to play again
      </button> */}
    </div>
  );
}
