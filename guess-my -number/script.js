'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const showNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score === 0) {
    displayMessage('💥 You lost the game!');
    return;
  }

  if (guess === secretNumber) {
    showNumber(secretNumber);
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  if (guess !== secretNumber) {
    if (!guess) {
      displayMessage('⛔ No number!');
      return;
    }
    document.querySelector('.message').textContent =
      guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
    score--;
    document.querySelector('.score').textContent = score;
  }
});

// challenge 1
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  showNumber('?');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
