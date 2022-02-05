/*-------------------------------- Constants --------------------------------*/

const combinations= [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/*---------------------------- Variables (state) ----------------------------*/

let squaresArr, turn, winner; 

/*------------------------ Cached Element References ------------------------*/

const message = document.querySelector('#message');
const resetButton = document.querySelector('.reset');
// const square0 = document.querySelector('#sq0');
// const square1 = document.querySelector('#sq1');
// const square2 = document.querySelector('#sq2');
// const square3 = document.querySelector('#sq3');
// const square4 = document.querySelector('#sq4');
// const square5 = document.querySelector('#sq5');
// const square6 = document.querySelector('#sq6');
// const square7 = document.querySelector('#sq7');
// const square8 = document.querySelector('#sq8');

const allSquares = document.querySelectorAll('.square');

/*----------------------------- Event Listeners -----------------------------*/

allSquares.forEach(element => element.addEventListener('click', handleClick));

resetButton.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  squaresArr = [null,null,null,null,null,null,null,null,null];
  turn = 1;
  winner = null;
  resetButton.setAttribute("hidden", true);
  
}

function handleClick(evt) {
  let idx = evt.target.id[2];
  if (squaresArr[idx] || winner) {
    return;
  }
  squaresArr[idx] = turn;
  console.log(squaresArr);
  getWinner(turn);
  console.log(winner);
  render(idx);
  turn *= -1;
}

function getWinner(num) {
  let indexArr = [];
  squaresArr.forEach((square, index) => {
    if (square === num) {
      indexArr.push(index);
    }
  })
  for (let i = 0; i < combinations.length; i++) {
    if (indexArr.join('').includes(combinations[i].join(''))) {
      return winner = num;
    }
  }
}

function render(idx) {
  (turn === 1) ? allSquares[idx].textContent = 'X' : allSquares[idx].textContent = 'O';
  resetButton.removeAttribute("hidden");
  if (winner) {
    (turn === 1) ? message.textContent = 'Player X won!' : message.textContent = 'Player O won!';
  } else if (!squaresArr.some(square => square === null)) {
    message.textContent = "It's a tie!";
  } else {
    (turn === 1) ? message.textContent = 'Player O' : message.textContent = 'Player X';
  }
}


