/**
 * Utility function for representing the grid container as a numeric array
 * @param {object} document - HTML DOM document object
 * @param {number} numCells - number of grid columns
 * @pre  - 'document' must point to the HTML DOM document object
 *       - 'numCells' must be a positive integer
 * @post - appropriate object is returned
 *       - an error is thrown in case of invalid 'numCells'
 *       - there is no precondition checking for 'document'; the developer must ensure input validity
 * @returns array of grid entries; 0 indicates open cell and 1 indicates closed cell
 */
export const setLinearGrid = (document, numCells) => {
  // precondition checking
  if (!Number.isInteger(numCells)) throw new Error("'numCells' parameter must be an integer!");
  if (numCells <= 0) throw new Error("'numCells' must be a positive integer!");

  // array of grid entries
  const linearGrid = [];

  for (let i = 0; i < numCells; i++) {
    const cell = document.getElementById(`cell-${i}`);
    const cellBinary = cell.classList.contains("maze-cell-closed") ? 1 : 0;
    linearGrid.push(cellBinary);
  }

  return linearGrid;
}

/**
 * Utility function for converting a 1D array into a 2D array (matrix)
 * @param {number[]} list - 1D numeric array
 * @param {number} numRows - number of grid rows
 * @param {number} numColumns - number of grid columns
 * @returns 2D array (matrix) representation of 'list'
 */
export const convertListToMatrix = (list, numRows, numColumns) => {
  // precondition checking
  if (list.length !== numRows * numColumns)
    throw new Error("'list' length must be equivalent to the product of the 'numRows' & 'numColumns'!");
  
  // matrix of 'list'
  const grid = [];
  let listIndex = 0;
  
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numColumns; j++) {
      row.push(list[listIndex]);
      listIndex++;
    }
    grid.push(row);
  }

  return grid;
}

/**
 * Utility function for marking the solution path on the grid
 * @param {document} document - HTML DOM document object
 * @param {object[]} path - array of cells
 * @param {number} numColumns - number of grid columns
 * @pre  - 'document' must point to the HTML DOM document object
 *       - 'path' array elements are valid coordinates of grid cells on the solution path
 *       - 'numCells' must be a positive integer
 * @post - solution path is marked on the grid
 *       - an error is thrown in case of invalid 'path' or 'numColumns'
 *       - there is no precondition checking for 'document'; the developer must ensure input validity
 */
export const markPath = async (document, path, numColumns) => {
  const DELAY_MILLISECONDS = 50;
  for (let i = 0; i < path.length; i++) {
    let index = path[i][0] * numColumns + path[i][1];
    const cell = document.getElementById(`cell-${index}`);
    if (!cell.classList.contains("maze-cell-start") && !cell.classList.contains("maze-cell-finish")) {
      cell.classList.remove("maze-cell-open");
      cell.classList.add("maze-cell-path");
      await pause(DELAY_MILLISECONDS);
    }
  }
}

/**
 * Helper function for markPath to pause and create a sequential effect
 * @param {Number} delayMilliseconds 
 * @returns promise which is resolved after the specified duration (delayMilliseconds)
 */
const pause = (delayMilliseconds) => {
  return new Promise(resolve => setTimeout(resolve, delayMilliseconds));
}

/**
 * Determines the coordinate of the default starting point based on the maze dimensions.
 * The coordinate is 1/2 of the height and 1/5 of the width.
 * @param {Number} numCellsWidth 
 * @param {Number} numCellsHeight 
 * @param {Number[]} start * modifying global variable
 * @returns index corresponding to the indicated coordinate for starting point.
 */
export const indicateStart = (numCellsWidth, numCellsHeight, start) => {
  start[0] = Math.floor(numCellsHeight / 2);
  start[1] = Math.floor(numCellsWidth / 5);
  return start[1] + start[0] * numCellsWidth;
};

/**
 * Determines the coordinate of the default finish point based on the maze dimensions.
 * The coordinate is 1/2 of the height and 4/5 of the width.
 * @param {Number} numCellsWidth 
 * @param {Number} numCellsHeight 
 * @param {Number[]} finish * modifying global variable
 * @returns 
 */
export const indicateFinish = (numCellsWidth, numCellsHeight, finish) => {
  finish[0] = Math.floor(numCellsHeight / 2);
  finish[1] = Math.floor(numCellsWidth * 4 / 5);
  return finish[1] + finish[0] * numCellsWidth;
};

/**
 * Clears the solution path after the maze is solved. The maze itself remains intact.
 * @param {Object[]} document * modifying UI
 * @param {Number} numCells 
 */
export const clearPath = (document, numCells) => {
  for (let i = 0; i < numCells; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    if (currentCell.classList.contains("maze-cell-path")) {
      currentCell.classList.remove("maze-cell-path");
      currentCell.classList.add("maze-cell-open");
    }
  }
};

/**
 * Clears the entire maze, including the solution path.
 * @param {Object[]} document * modifying UI
 * @param {Number} numCells 
 */
export const clearMaze = (document, numCells) => {
  for (let i = 0; i < numCells; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    if (!currentCell.classList.contains("maze-cell-start") && !currentCell.classList.contains("maze-cell-finish")) {
      currentCell.classList.remove("maze-cell-closed");
      currentCell.classList.remove("maze-cell-path");
      currentCell.classList.add("maze-cell-open");
    }
  }
};

/**
 * Clears the entire maze, including the solution path, and generates a new maze.
 * Open & closed cells are set with a 7:3 ratio.
 * @param {Object[]} document * modifying the UI
 * @param {Number} numCells 
 */
export const generateMaze = (document, numCells) => {
  clearMaze(document, numCells);
  for (let i = 0; i < numCells; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    let indicator = Math.random();
    if (indicator < 0.3) {
      if (!currentCell.classList.contains("maze-cell-start") && !currentCell.classList.contains("maze-cell-finish")) {
        currentCell.classList.remove("maze-cell-open");
        currentCell.classList.add("maze-cell-closed");
      }
    }
  }
};
