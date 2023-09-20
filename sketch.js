let celSize = 48;
let puzzle = [[]];
let width = celSize * 9;
let height = celSize * 9;

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function setup() {
  // setup code
  frameRate(30);
  createCanvas(width + 250, height);

  solveBtn = createButton("Solve");
  solveBtn.position(500, 120);

  puzzleList = createSelect();
  puzzleList.position(500, 100);
  puzzleList.option("Puzzle 1");
  puzzleList.option("Puzzle 2");
  puzzleList.changed(mySelectEvent);
  puzzle = mySelectEvent();
  
}



function draw() {

  

  solveBtn.mouseClicked(solveSudoku);

  // draw board
  background(220);
  stroke(0);
  for (let i = 0; i <= 9; i++) {
    if ((i % 3) == 0) {
      strokeWeight(5);
    }
    else {
      strokeWeight(2);
    }
    line(i * celSize, 0, i * celSize, height);
  }
  for (let i = 0; i <= 9; i++) {
    if ((i % 3) == 0) {
      strokeWeight(5);
    }
    else {
      strokeWeight(2);
    }
    line(0, i * celSize, width, i * celSize);
  }

  //Display puzzle
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0, 0, 0);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] != 0) {
        text(puzzle[i][j], j * celSize + 24, i * celSize + 24);
      }
    }
  }
  
}

function isSafe(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (puzzle[row][i] === num || puzzle[i][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;

}

function solveSudoku() {
  if (solve()) {
    console.log('Sudoku solved!');
  }
  else {
    console.log('No solution exists!');
  }

}

function solve() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === 0) {
        for (let num = 1; num <=9; num++) {
          if (isSafe(row, col, num)) {
            puzzle[row][col] = num;
            if (solve()) {
              return true;
            }
            puzzle[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function mySelectEvent() {
  let item = puzzleList.value();

  if (item == "Puzzle 1") {
    puzzle = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
              [6, 0, 0, 1, 9, 5, 0, 0, 0],
              [0, 9, 8, 0, 0, 0, 0, 6, 0],
              [8, 0, 0, 0, 6, 0, 0, 0, 3],
              [4, 0, 0, 8, 0, 3, 0, 0, 1],
              [7, 0, 0, 0, 2, 0, 0, 0, 6],
              [0, 6, 0, 0, 0, 0, 2, 8, 0],
              [0, 0, 0, 4, 1, 9, 0, 0, 5],
              [0, 0, 0, 0, 8, 0, 0, 7, 9]];
  }
  else if (item == "Puzzle 2") {
    puzzle = [[5, 0, 0, 0, 3, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 3, 0, 0],
              [0, 0, 0, 0, 0, 0, 9, 7, 0],
              [0, 6, 8, 0, 0, 9, 0, 0, 0],
              [0, 0, 2, 0, 7, 0, 0, 1, 0],
              [0, 0, 1, 8, 0, 0, 5, 3, 0],
              [0, 3, 7, 0, 0, 0, 0, 0, 0],
              [6, 0, 0, 5, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  return puzzle;

}
