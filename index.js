const body = document.querySelector("body");
const againBtn = document.querySelector(".again");
const input = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const message = document.querySelector(".message");
const form = document.querySelector(".left");
const score = document.querySelector(".score");
const number = document.querySelector(".number");
const highscore = document.querySelector(".highscore");

let secret = Math.ceil(Math.random() * 20);
let guess;
let scoreValue = 20;
score.textContent = scoreValue;
const initailHighScore = localStorage.getItem("HS")
let highscoreValue = initailHighScore?JSON.parse(initailHighScore):0;
highscore.textContent = highscoreValue;
let canReset = false;

const handleLoss = () => {
  body.style.backgroundColor = "#CC0202";
  message.textContent = "👎🏽 You lose!";
  number.textContent = secret;
  input.disabled = true;
  checkBtn.disabled = true;
  canReset = true;
};

const handleWin = () => {
  message.textContent = `🥳 ${guess} is correct!`;
  number.textContent = secret;
  body.style.backgroundColor = "#60b347";
  if (scoreValue > highscoreValue) {
    highscoreValue = scoreValue;
    highscore.textContent = highscoreValue;
    localStorage.setItem("HS",highscoreValue);
  }
  input.disabled = true;
  checkBtn.disabled = true;
  canReset = true;
};

const handleSubmit = (mes) => {
  message.textContent = mes;
  input.focus();
  input.value = "";
};

const decreaseScore = () => {
  scoreValue--;
  score.textContent = scoreValue;
};

const check = function () {
  guess = input.value;
  console.log(secret);
  if (!guess) {
    // Number is undefined
    handleSubmit("⛔ No number!");
  } else if (guess > 20 || guess < 1) {
    // Invalid number
    handleSubmit("⚠️ Between 1 and 20");
  } else if (guess == secret) {
    // Correct number
    handleWin()
  } else if (guess > secret) {
    // Higher number
    handleSubmit(`📈 ${guess} is Too high!`);
    decreaseScore();
    if (scoreValue === 0) {
      handleLoss();
    }
  } else if (guess < secret) {
    // Lower number
    handleSubmit(`📉 ${guess} is Too low!`);
    decreaseScore();
    if (scoreValue === 0) {
      handleLoss();
    }
  }
};

const again = function () {
  if (canReset) {
    console.log("resetting");
    canReset = false;
    secret = Math.ceil(Math.random() * 20);
    scoreValue = 20;
    message.textContent = "Start guessing...";
    number.textContent = "?";
    body.style.backgroundColor = "#222";
    score.textContent = scoreValue;
    input.focus();
    input.value = "";
    input.disabled = false;
    checkBtn.disabled = false;
  }
};

checkBtn.addEventListener("click", check);
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
againBtn.addEventListener("click", again);
