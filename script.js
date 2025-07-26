const playerSymbol = "🐱";
const aiSymbol = "🐶";
let currentPlayer = playerSymbol;
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const modeSelect = document.getElementById("modeSelect");
const clickSound = document.getElementById("clickSound");

let gameMode = modeSelect.value;

modeSelect.addEventListener("change", () => {
  gameMode = modeSelect.value;
  resetGame();
});

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (!gameActive) return;

  if (gameMode === "single") {
    setTimeout(() => {
      const aiMove = getBestMove();
      if (aiMove !== -1) makeMove(aiMove, aiSymbol);
    }, 500);
  } else {
    currentPlayer = (currentPlayer === playerSymbol) ? aiSymbol : playerSymbol;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }
}

function makeMove(index, symbol) {
  gameState[index] = symbol;
  cells[index].textContent = symbol;
  clickSound.play();

  if (checkWinner(symbol)) {
    statusDisplay.textContent = `${symbol} wins! 🎉`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusDisplay.textContent = "It's a draw! 🤝";
    gameActive = false;
  }
}

function checkWinner(symbol) {
  return winningConditions.some(condition =>
    condition.every(index => gameState[index] === symbol)
  );
}

function getBestMove() {
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") return i;
  }
  return -1;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = playerSymbol;
  cells.forEach(cell => cell.textContent = "");
  statusDisplay.textContent = `${playerSymbol}'s turn`;
}
