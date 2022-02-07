/*-------------------------------- Constants --------------------------------*/

const combinations= [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/*---------------------------- Variables (state) ----------------------------*/

let squaresArr, turn, winner; 

/*------------------------ Cached Element References ------------------------*/

const message = document.querySelector('#message');
const resetButton = document.querySelector('.reset');
const allSquares = document.querySelectorAll('.square');
const allImg = document.querySelectorAll('.square-img');
const winImg = document.querySelector('.win-img');

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
  resetButton.textContent = "Call for recount";
  winImg.removeAttribute('src');
  render();
}

function handleClick() {
  let idx = this.id[2];
  if (squaresArr[idx] || winner) {
    return;
  }
  squaresArr[idx] = turn;
  getWinner();
  turn *= -1;
  render();
}

function getWinner() {
  let checker = 0;
  for (let i = 0; i < combinations.length; i++) {
    for (let n = 0; n < combinations[i].length; n++) {
      if (squaresArr[combinations[i][n]] !== turn) {
        checker = 0;
        break;
      } else {
        checker += 1;
      }
      if (checker === 3) {
      return winner = turn;
      }
    }
  }
}

function render() {
  squaresArr.forEach((square, index) => {
    if (squaresArr[index] === 1) {
      allImg[index].setAttribute('src', './images/rep.png');
      } else if (squaresArr[index] === -1) {
        allImg[index].setAttribute('src', './images/dem.png');
      } else {
        if (allImg[index].src) { 
        allImg[index].removeAttribute('src');
        }
      }
    }
    )
  
  if (squaresArr.filter(square => square === null).length === 8) {
    resetButton.removeAttribute("hidden");
  }

  if (winner) {
    renderWin();
  } else if (!squaresArr.some(square => square === null)) {
    message.textContent = "Hmmmm... Looks like it's a tie! It seems we'll need another tour?";
    resetButton.textContent = 'Another tour'
  } else {
    (turn === 1) ? message.textContent = 'Team Red, you go!' : message.textContent = 'Team Blue, it\'s your turn now!';
  }
}

function renderWin() {
  confetti.start(2000);
  if (winner === 1) {
    message.textContent = 'Congratulations team Red! You\'ve got all the votes here! How about another poll?';
    winImg.setAttribute('src', './images/repWin.gif')
   } else {
     message.textContent = 'Congratulations team Blue! You\'ve got all the votes here! How about another poll?';
     winImg.setAttribute('src', './images/demWin.gif')
   }
    resetButton.textContent = 'Try another poll';
}