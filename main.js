"use strict";

const score = [0, 0];
let playerMove = 0;
const playerScore = document.querySelector(".score-0");
const computerScore = document.querySelector(".score-1");
const btnRock = document.querySelector(".btnRock");
const btnPaper = document.querySelector(".btnPaper");
const btnScissor = document.querySelector(".btnScissor");
const optionsBox = document.querySelector(".options-box");
const displayMove = document.querySelector(".display-move");
const playerMoveImage = document.querySelector(".playerMoveImage");
const computerMoveImage = document.querySelector(".computerMoveImage");
const resultSection = document.querySelector(".result");
const btnContinue = document.querySelector(".btn-continue");
const msg = document.querySelector(".msg");
const newGame = document.querySelector(".btn-new-game");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const helpBtn = document.querySelector(".btn-help");

function init() {
  playerScore.textContent = score[0];
  computerScore.textContent = score[1];
}

function generateComputerMove() {
  const computerMove = Math.floor(Math.random() * 3);
  return computerMove;
}

function checkWinner(userMove, opponentMove) {
  // 0 => Draw, 1 => Player, 2 => Opponent
  // Main Logic of the Game
  // Rock = 0, Paper = 1, Scissor = 2
  // Rock vs Scissor, Paper vs Rock, Scissor vs Paper
  if (
    (userMove == 0 && opponentMove == 2) ||
    (userMove == 1 && opponentMove == 0) ||
    (userMove == 2 && opponentMove == 1)
  ) {
    // Player wins
    score[0] = score[0] + 1;
    return 1;
  } else if (
    (userMove == 2 && opponentMove == 0) ||
    (userMove == 0 && opponentMove == 1) ||
    (userMove == 1 && opponentMove == 2)
  ) {
    // Opponent wins
    score[1] = score[1] + 1;
    return 2;
  } else {
    // Draw
    return 0;
  }
}

function showMessage(message, textColor) {
  msg.textContent = message;
  msg.style.color = textColor;
}

function displayResult(winner) {
  // Showing Result and Continue button
  resultSection.classList.remove("hidden");
  btnContinue.classList.remove("hidden");
  if (winner == 1) {
    showMessage("You won the move!", "#159b35");
  } else if (winner == 2) {
    showMessage("Opponent won the move.", "#9b111e");
  } else {
    showMessage("The move has drawn.", "#ffbb31");
  }
}

function displayPlayersMove(user, move) {
  if (move == 0) {
    user == 0
      ? (playerMoveImage.src = "img/rock.png")
      : (computerMoveImage.src = "img/rock.png");
  } else if (move == 1) {
    user == 0
      ? (playerMoveImage.src = "img/paper.png")
      : (computerMoveImage.src = "img/paper.png");
  } else {
    user == 0
      ? (playerMoveImage.src = "img/scissor.png")
      : (computerMoveImage.src = "img/scissor.png");
  }
}

function checkIfGameOver() {
  if (score[0] == 10) {
    showMessage("Congratulations! You have won the game!", "#159b35");
    btnContinue.classList.add("hidden");
  } else if (score[1] == 10) {
    showMessage("Unfortunately! You have lost the game.", "#9b111e");
    btnContinue.classList.add("hidden");
  }
}

function showMove(playerMove) {
  const userMove = playerMove;
  const opponentMove = generateComputerMove();
  optionsBox.classList.add("hidden");
  displayMove.classList.remove("hidden");

  const winner = checkWinner(userMove, opponentMove);
  init();

  displayResult(winner);

  // Displaying user move image
  displayPlayersMove(0, userMove);

  // Displaying opponent move image
  displayPlayersMove(1, opponentMove);
  checkIfGameOver();
}

function showMoveOptions() {
  resultSection.classList.add("hidden");
  btnContinue.classList.add("hidden");
  optionsBox.classList.remove("hidden");
  displayMove.classList.add("hidden");
}

function showModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

init();

btnRock.addEventListener("click", function () {
  playerMove = 0;
  showMove(playerMove);
});

btnPaper.addEventListener("click", function () {
  playerMove = 1;
  showMove(playerMove);
});

btnScissor.addEventListener("click", function () {
  playerMove = 2;
  showMove(playerMove);
});

btnContinue.addEventListener("click", showMoveOptions);

newGame.addEventListener("click", function () {
  score[0] = 0;
  score[1] = 0;
  init();
  showMoveOptions();
});

helpBtn.addEventListener("click", showModal);
modalClose.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    hideModal();
  }
});
