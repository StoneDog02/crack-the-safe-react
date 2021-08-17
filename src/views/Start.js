import { VIEWS } from ".";

export function Start({ setView }) {
  return (
    <div className="game-container">
      <h1 className="title">Crack The Safe</h1>
      <button className="start" onClick={() => setView(VIEWS.PLAY)}>
        Start
      </button>
    </div>
  );
}
