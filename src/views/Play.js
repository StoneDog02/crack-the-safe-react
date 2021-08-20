import { useRef, useState } from "react";
import { VIEWS } from ".";

export function Play({ setView, setFinishMsg }) {
  const word = "12-06-36";
  const wordArr = word.split("");
  const [guessedWord, setGuessedWord] = useState("__-__-__");
  const [guesses, setGuesses] = useState([]);
  const [userGuess, setUserGuess] = useState("");
  const inputElemRef = useRef(null);
  const inputElem = inputElemRef.current;
  const [feedback, setFeedback] = useState("");

  function clearAndFocusInput() {
    setUserGuess("");
    if (inputElem) {
      inputElem.focus();
    }
  }

  function updateGuessedWord(guesses) {
    let newGuessedWordArr = [];
    for (let i = 0; i < wordArr.length; i++) {
      const letter = wordArr[i];
      if (guesses.includes(letter)) {
        newGuessedWordArr.push(letter);
      } else {
        newGuessedWordArr.push("_");
      }
    }
    return newGuessedWordArr.join("");
  }

  function handleGuess() {
    if (guesses.includes(userGuess)) {
      clearAndFocusInput();
      return giveFeedback("You guessed that :P " + guesses, "normal");
    }

    guesses.push(userGuess);
    if (!word.includes(userGuess)) {
      moreGuesses(guesses.length);
      return giveFeedback("You guessed wrong", "fail");
    }
    giveFeedback("You guessed right", "success");

    const updatedWord = updateGuessedWord(guesses);
    setGuessedWord(updatedWord);

    clearAndFocusInput();

    if (word === updatedWord) {
      const numberOfGuesses = guesses.length;
      return goToFinishPage(`Wow you guessed ${numberOfGuesses} times!`);
    }
    moreGuesses(guesses.length);
  }

  function moreGuesses(numberOfGuesses) {
    if (numberOfGuesses >= 10) {
      goToFinishPage("You lost, you took to many guesses");
    }
  }

  function goToFinishPage(msg) {
    setFinishMsg(msg);
    setView(VIEWS.FINISH);
  }

  function giveFeedback(feedback, type) {
    setFeedback(feedback);
    // TODO: styles and classes :P
    // feedbackElem.className = type;
  }

  return (
    <div className="game-container">
      <h3>Guess the combination</h3>
      <h1 className="word" id="wordElem">
        {guessedWord}
      </h1>
      <div className="feedback"></div>
      <div>
        <label id="feedback" htmlFor="guessElem" className="normal">
          I am even. Half of me is the root of my last number. What is my code?
        </label>
        <input
          ref={inputElemRef}
          value={userGuess}
          onChange={(event) => setUserGuess(event.target.value)}
          autoFocus
        />
        <button onClick={handleGuess}>guess</button>
      </div>
    </div>
  );
}
