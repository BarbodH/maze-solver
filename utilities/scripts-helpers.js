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
export const markPath = async (document, path, numColumns, mode) => {
  const DELAY_MILLISECONDS = 50;
  for (let i = 0; i < path.length; i++) {
    let index = path[i][0] * numColumns + path[i][1];
    console.log(index);
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
