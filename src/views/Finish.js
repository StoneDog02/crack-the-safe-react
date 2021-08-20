import { useState } from "react";
import { VIEWS } from ".";

export function Finish({ setView, finishMsg }) {
  const [winLoseMsg, setWinLoseMsg] = useState("You cracked the code!");
  return (
    <div className="game-container">
      <h1>{moreGuesses >= 10 ? !winLoseMsg : "Oh no, you lost!"}</h1>
      <h3 id="result">{finishMsg}</h3>
      <button className="again" onClick={() => setView(VIEWS.PLAY)}>
        play again?
      </button>
      <button className="nope" onClick={() => setView(VIEWS.START)}>
        I dont want to play again
      </button>
    </div>
  );
}
