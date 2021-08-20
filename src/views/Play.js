import { useRef, useState } from "react";
import { VIEWS } from ".";
import { SafeDial } from "../components/SafeDial";
import { CONSTANTS } from "../constants";

export function Play({ setView, setFinishMsg }) {
  // const word = "12-06-36"; // [12,6,36]
  // const wordArr = word.split("");
  const word = [12, 6, 36];
  const [guessedWord, setGuessedWord] = useState("_-_-_");
  const [guesses, setGuesses] = useState([""]);
  const [userGuess, setUserGuess] = useState(null);
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
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (guesses.includes(letter)) {
        newGuessedWordArr.push(letter);
      } else {
        newGuessedWordArr.push("_");
      }
    }
    return newGuessedWordArr.join("-");
  }

  function handleGuess() {
    if (guesses.includes(userGuess)) {
      clearAndFocusInput();
      return giveFeedback("You guessed that :P " + guesses, "normal");
    }

    guesses.push(userGuess);
    if (!word.includes(userGuess)) {
      moreGuesses(guesses.length);
      clearAndFocusInput();
      return giveFeedback("You guessed wrong", "fail");
    }
    giveFeedback("You guessed right", "success");

    const updatedWord = updateGuessedWord(guesses);
    setGuessedWord(updatedWord);

    clearAndFocusInput();

    if (word.join("-") === updatedWord) {
      const numberOfGuesses = guesses.length;
      return goToFinishPage({
        title: CONSTANTS.WINNING_TITLE,
        subtitle: CONSTANTS.WINNING_SUBTITLE + numberOfGuesses
      });
    }
    moreGuesses(guesses.length);
  }

  function moreGuesses(numberOfGuesses) {
    if (numberOfGuesses >= 10) {
      return goToFinishPage({
        title: CONSTANTS.LOSING_TITLE,
        subtitle: CONSTANTS.LOSING_SUBTITLE
      });
    }
  }

  function goToFinishPage(msgObject) {
    setFinishMsg(msgObject);
    setView(VIEWS.FINISH);
  }

  function giveFeedback(feedback, type) {
    setFeedback(feedback);
    // TODO: styles and classes :P
    // feedbackElem.className = type;
  }

  return (
    <div className="game-container">
      <SafeDial current={userGuess} numOfOptions={40} />
      <h3>Guess the combination</h3>
      <h1 className="word" id="wordElem">
        {guessedWord}
      </h1>
      <div className="feedback">{feedback}</div>
      <div>
        <label id="feedback" htmlFor="guessElem" className="normal">
          I am even. Half of me is the root of my last number. What is my code?
        </label>
        <input
          ref={inputElemRef}
          value={userGuess}
          onChange={(event) => {
            const newVal = event.target.value;
            const numberVal = parseInt(event.target.value, 10);
            if (isNaN(numberVal)) {
              return setUserGuess(newVal);
            }
            return setUserGuess(numberVal);
          }}
          autoFocus
        />
        <button onClick={handleGuess}>guess</button>
      </div>
    </div>
  );
}
