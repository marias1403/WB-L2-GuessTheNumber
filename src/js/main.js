import '../assets/styles/index.css';

const minRange = document.getElementById('min');
const maxRange = document.getElementById('max');
const startBtn = document.getElementById('start');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const guessInput = document.getElementById('userGuess');
const gameArea = document.querySelector('.game-area');
const gameAttempt = document.querySelector('.game__attempt');
const gameClue = document.getElementById('clue-text');
const gameMessage = document.getElementById('message-text');
const winMessage = document.getElementById('win-message');
const winText = document.getElementById('win-text');

let minNumber = 1;
let maxNumber = 100;
let secretNumber, attempts;

startBtn.addEventListener('click', () => {
  const newMin = parseInt(minRange.value);
  const newMax = parseInt(maxRange.value);

  if (isNaN(newMin) || isNaN(newMax) || newMin >= newMax) {
    showMessage('Пожалуйста, укажите корректный диапазон чисел.');
    return;
  }

  disableBtn(startBtn);

  minNumber = newMin;
  maxNumber = newMax;

  newGame();
});

guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
    showMessage(`Пожалуйста, введите число в диапазоне от ${minNumber} до ${maxNumber}.`);
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    winMessage.classList.remove('game__win-wrapper_hidden');
    winText.textContent = `Вы угадали, это число ${secretNumber}.`;
    gameClue.style.display = 'none';
    gameMessage.style.display = 'none';
    disableBtn(guessBtn);
    restartBtn.classList.remove('game__button_hidden')
  } else {
    if (attempts % 3 === 0) {
      showClue();
    } else if (guess > secretNumber) {
      showMessage('Загаданное число меньше предложенного');
    } else if(guess < secretNumber) {
      showMessage('Загаданное число больше предложенного');
    }
  }
  setAttempts();
});

restartBtn.addEventListener('click', () => {
  restartBtn.classList.add('game__button_hidden');
  gameArea.classList.add('game-area_hidden');
  winMessage.classList.add('game__win-wrapper_hidden');

  enableBtn(guessBtn);
  enableBtn(startBtn);

  minRange.value = '1';
  maxRange.value = '100';

  guessInput.value = '';
});

function newGame() {
  gameArea.classList.remove('game-area_hidden');
  secretNumber = generateRandomNumber(minNumber, maxNumber);
  console.log(secretNumber);
  attempts = 0;
  setAttempts();
  showMessage('');
}

function setAttempts() {
  gameAttempt.textContent = 'Ваши попытки:' + attempts;
}

function showClue() {
  const prompt = secretNumber % 2 === 0 ? 'чётным' : 'нечётным';
  gameClue.style.display = 'block';
  gameClue.textContent = 'Число является ' + prompt;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showMessage(message) {
  gameMessage.style.display = 'block';
  gameMessage.textContent = message;
}

function disableBtn(btn) {
  btn.classList.add('game__button_disabled');
  btn.disabled = true;
}

function enableBtn(btn) {
  btn.classList.remove('game__button_disabled');
  btn.disabled = false;
}
