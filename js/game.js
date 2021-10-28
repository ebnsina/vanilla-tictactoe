function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverEl.firstElementChild.innerHTML =
    'The winner is <span id="winner-name">PLAYER NAME!</span>';
  gameOverEl.style.display = 'none';

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardEl.children[gameBoardIndex];
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === '' || players[1].name === '') {
    alert('Set both player name to START GAME!');
    return;
  }

  resetGame();

  activePlayerName.textContent = players[activePlayer].name;
  gameAreaEl.style.display = 'block';
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(e) {
  if (e.target.tagName !== 'LI' || gameIsOver) {
    return;
  }

  const selectedField = e.target;
  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert('Please select an empty field.');
    return;
  }

  selectedField.textContent = players[activePlayer].icon;
  selectedField.classList.add('disabled');
  gameData[selectedRow][selectedCol] = activePlayer + 1;
  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    gameEnd(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // check row equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // check column equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[i][0];
    }
  }

  // check diagonal top left -> bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // check diagonal bottom left -> top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function gameEnd(winnerId) {
  gameIsOver = true;
  gameOverEl.style.display = 'block';

  if (winnerId > 0) {
    gameOverEl.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name + '! 🏆';
  } else {
    gameOverEl.firstElementChild.textContent = "It's a draw! 😕";
  }
}
