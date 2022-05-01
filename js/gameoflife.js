function seed() {
  return [...arguments];
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  let exists = false;
  for (const sourceCell of this) {
    if (cell[0] === sourceCell[0] && cell[1] === sourceCell[1]) {
      exists = true;
      break;
    }
  }
  return exists;
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  if (state.length === 0) {
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0]
    };
  }

  let minX, maxX, minY, maxY;

  state.forEach(element => {
    if (element) {
      minX = minX === undefined ? element[0] : element[0] < minX ? element[0] : minX;
      maxX = maxX === undefined ? element[0] : element[0] > maxX ? element[0] : maxX;
      minY = minY === undefined ? element[1] : element[1] < minY ? element[1] : minY;
      maxY = maxY === undefined ? element[1] : element[1] > maxY ? element[1] : maxY;
    }
  });

  return {
    topRight: [maxX, maxY],
    bottomLeft: [minX, minY]
  };
};

const printCells = (state) => {
  const cornersValue = corners(state);
  const initX = cornersValue.bottomLeft[0];
  const limitX = cornersValue.topRight[0];
  const initY = cornersValue.bottomLeft[1];
  const limitY = cornersValue.topRight[1];
  let rectangle;

  for (let indexY = initY; indexY <= limitY; indexY++) {
    for (let indexX = initX; indexX <= limitX; indexX++) {
      rectangle += printCell([indexX, indexY], state) + ' ';
    }
    rectangle += '\n';
  }

  return rectangle;
};

const getNeighborsOf = ([x, y]) => { };

const getLivingNeighbors = (cell, state) => { };

const willBeAlive = (cell, state) => { };

const calculateNext = (state) => { };

const iterate = (state, iterations) => { };

const main = (pattern, iterations) => { };

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3]
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2]
  ]
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;