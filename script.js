const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnerMsgTextElement = document.querySelector("[data-winner-msg]");
const winnerMsg = document.querySelector("[data-winner]");
const restartButton = document.querySelector("[data-restart-btn]");

let isCircleTurn;

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winnerMsg.classList.remove("show-winner-msg");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winnerMsgTextElement.innerHTML = "Empate!";
  } else {
    winnerMsgTextElement.innerHTML = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }

  winnerMsg.classList.add("show-winner-msg");
};

const checkForWin = (currentPlayer) => {
  return winnerCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  /* colocar marca (X ou Circle) */
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  /* Verificar  por vitória */
  const isWin = checkForWin(classToAdd);

  /* Verificar  por empate */
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    /* mudar simbolo */
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
