export function Finish() {
  return (
    <div className="game-container">
      <h1>You cracked the code!</h1>
      <h3 id="result">It took 12 times!</h3>
      <a className="again" href="/play.html">
        play again?
      </a>
      <a className="nope" href="/index.html">
        I dont want to play again
      </a>
    </div>
  );
}
