/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  //base case
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var grid = [];
  var solutions = [];

  var reArrange = function() {
    var gridMinusFirst = grid.splice(1);
    var newGrid = gridMinusFirst.concat(grid);
    grid = newGrid;
    //console.log(JSON.stringify(grid));
  };

  var createGrid = function(n) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        grid.push([i, j]);
      }
    }
  };

  // 
  var findSolution = function() {
    var board = new Board({n: n});
    for (var i = 0; i < grid.length; i++) {
      board.togglePiece(grid[i][0], grid[i][1]);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(grid[i][0], grid[i][1]);
      }
    }
    return JSON.stringify(board.rows());
  };
  createGrid(n);

  // This has to iterate through every square on chessboard
  for (var i = 0; i < (n * n); i++) {
    solutions.push(findSolution());
    reArrange();
  }
  // console.log('solutions', _.uniq(solutions));
  // console.log('length', _.uniq(solutions).length);
  // var solutionCount = _.uniq(solutions).length; //fixme

  //Fib function
  var fib = function(n) {
    if ( n === 1) {
      return 1;
    } else {
      return (n * fib(n - 1));
    }
  };

  var solutionCount = fib(n); //math solution. not really counted solutions

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var grid = [];
  var queenCount = 0;
  //var solutions = [];

  var reArrange = function() {
    var gridMinusFirst = grid.splice(1);
    var newGrid = gridMinusFirst.concat(grid);
    grid = newGrid;
  };

  var createGrid = function(n) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        grid.push([i, j]);
      }
    }
  };

  var findSolution = function() {
    queenCount = 0;
    var board = new Board({n: n});
    for (var i = 0; i < grid.length; i++) {
      board.togglePiece(grid[i][0], grid[i][1]);
      queenCount++;
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(grid[i][0], grid[i][1]);
        queenCount--;
      }
    }
    //console.log('queen count ' + queenCount);
    return board.rows();
  };
  createGrid(n);
  //solutions.push(findSolution());
  var findFullSolution = function() {
    for (var i = 0; i < (n * n); i++) {
      findSolution();
      if (queenCount === n) {
        // console.log(queenCount===n);
        // console.log(findSolution());
        return findSolution();
      }
      reArrange();
    }
  };
  //console.log('solutions', _.uniq(solutions));
  //console.log('length', _.uniq(solutions).length);
  //var solutionCount = _.uniq(solutions).length; //fixme

  var solution = findFullSolution(); //fixme <--fix it.
  //console.log(JSON.stringify(solution));

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
