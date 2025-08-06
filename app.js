
let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset');
let newgame = document.querySelector('#newgame');
let msgcontainer = document.querySelector('.MSG-container');
let msg = document.querySelector('.MSG');
let turnO = true;
let scoreX = 0;
let scoreO = 0;

let scoreXEl = document.querySelector('#scoreX');
let scoreOEl = document.querySelector('#scoreO');
const wincombo = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgcontainer.classList.add('hide');
};
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};
const enableBoxes = () => {
  boxes.forEach(box => {
    box.textContent = '';
    box.disabled = false;
  });
};
const showWinner = (winner) => {
  msg.innerText = `Player ${winner} has won the game!`;
  msgcontainer.classList.remove('hide');
  disableBoxes();
  // Update Score
  if (winner === 'X') {
    scoreX++;
    scoreXEl.innerText = scoreX;
  } else if (winner === 'O') {
    scoreO++;
    scoreOEl.innerText = scoreO;
  }
};

//  Show draw
const showDraw = () => {
  msg.innerText = "It's a draw!";
  msgcontainer.classList.remove('hide');
  disableBoxes();
};

const checkWin = () => {
  for (let combo of wincombo) {
    let pos1 = boxes[combo[0]].textContent;
    let pos2 = boxes[combo[1]].textContent;
    let pos3 = boxes[combo[2]].textContent;

    if (pos1 !== '' && pos2 !== '' && pos3 !== '') {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }
  }
  // Check for draw
  let allFilled = true;
  boxes.forEach(box => {
    if (box.textContent === '') {
      allFilled = false;
    }
  });

  if (allFilled) {
    showDraw();
  }
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.textContent !== '') return;

    box.textContent = turnO ? 'O' : 'X';
    box.disabled = true;
    turnO = !turnO;
    checkWin();
  });
});

newgame.addEventListener('click', resetGame);

resetButton.addEventListener('click', () => {
  scoreX = 0;
  scoreO = 0;
  scoreXEl.innerText = scoreX;
  scoreOEl.innerText = scoreO;
  resetGame();
});
