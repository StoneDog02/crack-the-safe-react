import { VIEWS } from ".";

export function Finish({ setView, finishMsg }) {
  return (
    <div className="game-container">
      <h1>{finishMsg.title}</h1>
      <h3 id="result">{finishMsg.subtitle}</h3>
      <button className="again" onClick={() => setView(VIEWS.PLAY)}>
        play again?
      </button>
      <button className="nope" onClick={() => setView(VIEWS.START)}>
        I dont want to play again
      </button>
    </div>
  );
}
