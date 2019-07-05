// Import stylesheets
import './style.css';

// Write Javascript code!
const boardDiv = document.getElementById('board');
const ROWS = 10;
const COLS = 10;

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
    reveal({row: row, col:col});

    const isGameOver = boardDiv.getElementsByClassName('col hidden').length === boardDiv.getElementsByClassName('col mine').length;
    if(isGameOver) gameOver(true);
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

function reveal(cell){
  const seen = {};

  function helper(i, j){
    if(i > ROWS || j > COLS || i < 0 || j < 0) return;
    const key = `${i} ${j}`;
    if(seen[key]) return;

    const $cell = getCell(i, j);
    
    if(!$cell || !$cell.classList.contains('hidden') || $cell.classList.contains('mine')) return;
    $cell.classList.remove('hidden');

    const mineCount = getMineCount(i, j);
    if(mineCount){
      $cell.textContent = mineCount;
      return;
    }

    for(let di = -1; di <= 1; di++){
      for(let dj = -1; dj <= 1; dj++){
        helper(parseInt(i) + parseInt(di), parseInt(j) + parseInt(dj));
      }
    }
  }
  
  helper(cell.row, cell.col);
}

function getCell(i, j){
  const $cells = boardDiv.getElementsByClassName('col hidden');
  const $cell;
  for(var c = 0; c <= $cells.length; c++){
    if($cells[c] && $cells[c].getAttribute('data-row') == i && $cells[c].getAttribute('data-col') == j){
      $cell = $cells[c];
      break;
    }
  }

  return $cell;
}

function getMineCount(i, j){
  let count = 0;
  for(let di = -1; di <= 1; di++){
    for(let dj = -1; dj <= 1; dj++){
      const ni = parseInt(i) + parseInt(di);
      const nj = parseInt(j) + parseInt(dj)
      if(ni > ROWS || nj > COLS || ni < 0 || nj < 0) continue;
      const $cell = getCell(ni, nj);
      if($cell && $cell.classList.contains('mine')) count++;
    }
  }

  return count;
}

function restart(){
  createBoard(ROWS, COLS);
}

restart();
