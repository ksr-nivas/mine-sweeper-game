// Import stylesheets
import './style.css';

// Write Javascript code!
const boardDiv = document.getElementById('board');

function createBoard(rows, cols){
  boardDiv.innerHTML = '';
  for(let i = 0; i < rows; i++){
    let rowDiv = document.createElement('div');
    rowDiv.classList = ['row'];

    for(let j = 0; j < cols; j++){
      let colDiv = document.createElement('div');
      colDiv.classList = ['col hidden'];
      colDiv.setAttribute('data-row', i);
      colDiv.setAttribute('data-col', j);
      if(Math.random() < 0.1){
        colDiv.classList.add('mine');
      }
      colDiv.addEventListener('click', onColClick);

      rowDiv.appendChild(colDiv);
    }

    boardDiv.appendChild(rowDiv);
  }
}

function onColClick(event){
  const cell = event.target;
  console.log(cell);

  if(cell.classList.contains('mine')){
    gameOver(false);
  }
  else{
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');
    reveal(row, col);
  }
}

function gameOver(isWin){
  let message = null;
  if(isWin){
    message = 'YOU WON.';
  }
  else {
    message = 'YOU LOST!';
  }
  alert(message);
  restart();
}

function reveal(){

}

function restart(){
  createBoard(10, 10);
}

restart();
