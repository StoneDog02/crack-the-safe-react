export function Play() {
  const word = "12-06-36";
  const wordArr = word.split("");
  const guessedWord = "____________";
  const guesses = [];
  const wordElem = document.getElementById("wordElem");
  return (
    <div className="game-container">
      <h3>Guess the combination</h3>
      <h1 className="word" id="wordElem">
        12-06-36
      </h1>
      <div className="feedback"></div>
      <div>
        <label id="feedback" for="guessElem" className="normal">
          I am even. Half of me is the root of my last number. What is my code?
        </label>
        <input id="guessElem" autofocus />
        <button onclick="guess()">guess</button>
        <div></div>
      </div>
    </div>
  );
}
