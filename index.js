const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const negativeMessage = document.getElementById('negative');
const biggerMessage = document.getElementById('bigger');
const notNumber = document.getElementById('notNumber');

let targetNumber;
var attempts = 0;
var maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

if (isNaN(guess)) { // Checking if the guess is a number
    notNumber.style.display = '';
    notNumber.style.color = "#FF0000";
    attempts -= 1;
} else { 
  if (guess < 0) { // Checking if the guess is in the range
    negativeMessage.style.display = '';
    negativeMessage.style.color = "#FF0000";
    attempts -= 1;
  } else if (guess > 99) {
    biggerMessage.style.display = '';
    biggerMessage.style.color = "#FF0000";
    attempts -= 1;
  } else if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

      correctMessage.style.display = '';

      submitButton.disabled = true;
      guessInput.disabled = true;
  } else if (guess !== targetNumber) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;

      numberOfGuessesMessage.style.display = '';
      if (remainingAttempts === 1){
        numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
      } else {
        numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
      }
    } else if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
      maxGuessesMessage.style.display = "";
    }
  }

  guessInput.value = '';
  resetButton.style.display = '';
}    

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
