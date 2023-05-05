const gameModule = (() => {
  const boxes = document.getElementsByClassName("box");
  const resultDisplay = document.getElementById("result");
  const replayButton = document.getElementById("replay");
  const winningSolutions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];
  let turnCounter = 0;
  let gameWon = false;
  let playerXSelections = [];
  let playerOSelections = [];
  function _resetGame() {
    turnCounter = 0;
    gameWon = false;
    playerXSelections = [];
    playerOSelections = [];

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
      boxes[i].style.pointerEvents = "auto";
    }

    resultDisplay.innerText = "";
  }
  function _checkWin(playerXSelections, playerOSelections, winningSolutions) {
    let winningSolutionFound = false;
    for (let i = 0; i < winningSolutions.length; i++) {
      const solution = winningSolutions[i];
      const foundInFirstPlayerSelections = solution.every((num) =>
        playerXSelections.includes(num)
      );
      const foundInSecondPlayerSelections = solution.every((num) =>
        playerOSelections.includes(num)
      );

      if (foundInFirstPlayerSelections) {
        winningSolutionFound = true;
        console.log("X won");
        _disableBoxes();
        resultDisplay.innerText = "X won";
        break;
      } else if (foundInSecondPlayerSelections) {
        winningSolutionFound = true;
        console.log("O won");
        _disableBoxes();
        resultDisplay.innerText = "O won";
        break;
      }
    }

    if (!winningSolutionFound && playerXSelections.length === 5) {
      resultDisplay.innerText = "It's a draw";
    }
  }

  function _disableBoxes() {
    for (let j = 0; j < winningSolutions.length + 1; j++) {
      boxes[j].style.pointerEvents = "none";
    }
  }

  replayButton.addEventListener("click", () => {
    _resetGame();
  });

  function _boxClickHandler(i) {
    if (boxes[i].innerHTML !== "X" && boxes[i].innerHTML !== "O" && !gameWon) {
      if (turnCounter % 2 === 0) {
        boxes[i].innerHTML = "X";
        turnCounter++;
        playerXSelections.push(i + 1);
        console.log(playerXSelections);
        _checkWin(playerXSelections, playerOSelections, winningSolutions);
      } else {
        boxes[i].innerHTML = "O";
        turnCounter++;
        playerOSelections.push(i + 1);
        console.log(playerOSelections);
        _checkWin(playerXSelections, playerOSelections, winningSolutions);
      }
    }
  }

  function init() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", () => {
        _boxClickHandler(i);
      });
    }
  }

  return {
    init: init,
  };
})();

gameModule.init();