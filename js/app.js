let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = [
  { name: '', icon: 'X' },
  { name: '', icon: 'O' },
];

const playerConfigOverlayEl = document.querySelector('#overlay-configuration');
const backdropEl = document.querySelector('#backdrop');
const formEl = document.querySelector('form');
const errorMessage = document.querySelector('#config-errors');

const startGameBtn = document.querySelector('#start-game-btn');
const activePlayerName = document.querySelector('#active-playername');
const gameAreaEl = document.querySelector('#game-activation');
const gameBoardEl = document.querySelector('#game-board');
const gameOverEl = document.querySelector('#game-over');
const editPlayer1BtnEl = document.querySelector('#player-1-edit-btn');
const editPlayer2BtnEl = document.querySelector('#player-2-edit-btn');
const cancelConfigEl = document.querySelector('#cancel-config-btn');
const confirmEl = document.querySelector('#confirm-btn');

editPlayer1BtnEl.addEventListener('click', openPlayerConfig);
editPlayer2BtnEl.addEventListener('click', openPlayerConfig);

cancelConfigEl.addEventListener('click', closePlayerConfig);
backdropEl.addEventListener('click', closePlayerConfig);

formEl.addEventListener('submit', savePlayerConfig);

startGameBtn.addEventListener('click', startNewGame);
gameBoardEl.addEventListener('click', selectGameField);
