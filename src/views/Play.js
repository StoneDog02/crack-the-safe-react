import { useCallback, useEffect, useRef, useState } from "react";
import { VIEWS } from ".";
import { SafeDial } from "../components/SafeDial";
import { CONSTANTS } from "../constants";

export function Play({ setView, setFinishMsg }) {
  // const word = "12-06-36"; // [12,6,36]
  // const wordArr = word.split("");
  const [startNumber, setStartNumber] = useState(
    (Math.floor(Math.random() * 4) + 3) * 2
  );
  const word = [
    startNumber,
    startNumber / 2,
    (startNumber / 2) * (startNumber / 2)
  ];
  const [guessedWord, setGuessedWord] = useState("_-_-_");
  const [guesses, setGuesses] = useState([""]);
  const [userGuess, setUserGuess] = useState(null);
  const [inputGuess, setInputGuess] = useState(null);
  const inputElemRef = useRef(null);
  const inputElem = inputElemRef.current;
  const [feedback, setFeedback] = useState("");

  const clearAndFocusInput = useCallback(
    function clearAndFocusInput() {
      setInputGuess("");
      setUserGuess(null);
      if (inputElem) {
        inputElem.focus();
      }
    },
    [inputElem]
  );

  const updateGuessedWord = useCallback(
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
    },
    [word]
  );

  function handleGuess() {
    if (userGuess === null) {
      return;
    }
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

  const goToFinishPage = useCallback(
    function goToFinishPage(msgObject) {
      setFinishMsg(msgObject);
      setView(VIEWS.FINISH);
    },
    [setFinishMsg, setView]
  );

  const moreGuesses = useCallback(
    function moreGuesses(numberOfGuesses) {
      if (numberOfGuesses >= 10) {
        return goToFinishPage({
          title: CONSTANTS.LOSING_TITLE,
          subtitle: CONSTANTS.LOSING_SUBTITLE
        });
      }
    },
    [goToFinishPage]
  );

  function giveFeedback(feedback, type) {
    setFeedback(feedback);
    // TODO: styles and classes :P
    // feedbackElem.className = type;
  }

  function handleInput(event) {
    console.log("You changed!");
    const newVal = event.target.value;
    const numberVal = parseInt(event.target.value, 10);
    if (isNaN(numberVal)) {
      return setInputGuess(newVal);
    }
    return setInputGuess(numberVal);
  }
  useEffect(() => {
    let handle = 0;
    if (inputGuess !== "") {
      setUserGuess(null);
      handle = setTimeout(() => {
        setUserGuess(inputGuess);
      }, 1000);
    }

    return () => clearTimeout(handle);
  }, [inputGuess, setUserGuess]);
  useEffect(handleGuess, [
    userGuess,
    clearAndFocusInput,
    goToFinishPage,
    guesses,
    moreGuesses,
    word,
    updateGuessedWord
  ]);

  return (
    <>
      <div className="game-container">
        <SafeDial
          current={userGuess}
          numOfOptions={40}
          correctValues={guesses.filter((guess) => word.includes(guess))}
          wrongValues={guesses.filter((guess) => !word.includes(guess))}
        />

        <input
          ref={inputElemRef}
          value={inputGuess}
          onChange={handleInput}
          autoFocus
        />
        {/* <button onClick={handleGuess}>guess</button> */}
      </div>
      <div>
        {/* <h3>Guess the combination</h3>
        <h1 className="word" id="wordElem">
          {guessedWord}
        </h1>
        <div className="feedback">{feedback}</div> */}
        <div id="feedback" htmlFor="guessElem" className="Hint sticky-note">
          The first number is {startNumber}. The second number is half of the
          first and is the root of the last number.
        </div>
      </div>
    </>
  );
}
