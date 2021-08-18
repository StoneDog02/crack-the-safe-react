export function Play() {
  const word = "12-06-36";
  const wordArr = word.split("");
  const guessedWord = "____________";
  const guesses = [];
  const wordElem = document.getElementById("wordElem");

  wordElem.innerHTML = guessedWord;

  function clearAndFocus(elem) {
    elem.value = "";
    elem.focus();
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
    // wordElem.innerHTML = guessedWord;
    return newGuessedWordArr.join("");
  }

  function guess() {
    const guessElem = document.getElementById("guessElem");
    const userGuess = guessElem.value.toLowerCase();
    if (guesses.includes(userGuess)) {
      clearAndFocus(guessElem);
      return giveFeedback("You guessed that :P " + guesses, "normal");
    }
    guesses.push(userGuess);
    if (!word.includes(userGuess)) {
      return giveFeedback("You guessed wrong", "fail");
    }
    giveFeedback("You guessed right", "success");

    const updatedWord = updateGuessedWord(guesses);
    wordElem.innerHTML = updatedWord;

    clearAndFocus(guessElem);

    if (word === updatedWord) {
      const numberOfGuesses = guesses.length;
      return goToFinishPage(`Wow you guessed ${numberOfGuesses} times!`);
    }
    moreGuesses(guesses.length);
  }

  function setMessage(msg) {
    localStorage.setItem("msg", msg);
  }
  function moreGuesses(numberOfGuesses) {
    if (numberOfGuesses >= 15) {
      goToFinishPage("You lost, you took to many guesses");
    }
  }

  function goToFinishPage(msg) {
    setMessage(msg);
    window.location = "/finish.html";
  }

  function giveFeedback(feedback, type) {
    const feedbackElem = document.getElementById("feedback");
    feedbackElem.innerHTML = feedback;
    feedbackElem.className = type;
  }

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
        <input onChange="" autofocus />
        <button onClick="guess()">guess</button>
      </div>
    </div>
  );
}
