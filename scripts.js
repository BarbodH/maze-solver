import Maze from "./maze-solver/maze.js";
import { setLinearGrid } from "./utilities/scripts-helpers.js";
import { convertListToMatrix } from "./utilities/scripts-helpers.js";
import { markPath } from "./utilities/scripts-helpers.js";

//////////////////// Element Initializations ////////////////////

const root = document.documentElement;

// global variables/constants
const GRID_ITEM_SIDE_LENGTH = 25;
let numItems = 0;
let numItemsWidth = 0;
let numItemsHeight = 0;

// maze setup
const visualizeContainerMaze = document.getElementById("visualize-container-maze");
const visualizeMaze = document.getElementById("visualize-maze");

// menu
const visualizeButtonClearPath = document.getElementById("visualize-button-clear-path");
const visualizeButtonClearMaze = document.getElementById("visualize-button-clear-maze");
const visualizeButtonGenerateMaze = document.getElementById("visualize-button-generate-maze");
const visualizeButtonSolve = document.getElementById("visualize-button-solve");

// arbitrary maze setup
let start = [0, 0];
let finish = [0, 0];
let grid = [[0, 0], [0, 0]];
const maze = new Maze(grid, start, finish);

//////////////////// Maze Setup ////////////////////

const setupMaze = () => {
  const containerWidth = visualizeContainerMaze.getBoundingClientRect().width;
  const containerHeight = visualizeContainerMaze.getBoundingClientRect().height;
  
  numItemsWidth = Math.floor(containerWidth / GRID_ITEM_SIDE_LENGTH);
  numItemsHeight = Math.floor(containerHeight / GRID_ITEM_SIDE_LENGTH);

  root.style.setProperty("--num-maze-columns", numItemsWidth.toString());

  numItems = numItemsWidth * numItemsHeight;
  const indexStart = indicateStart(numItemsWidth, numItemsHeight);
  const indexFinish = indicateFinish(numItemsWidth, numItemsHeight);
  for (let i = 0; i < numItems; i++) {
    let newCell = document.createElement("button");
    
    if (i == indexStart) newCell.classList.add("maze-cell", "maze-cell-start")
    else if (i == indexFinish) newCell.classList.add("maze-cell", "maze-cell-finish");
    else newCell.classList.add("maze-cell", "maze-cell-open");

    newCell.setAttribute("id", `cell-${i}`)
    newCell.addEventListener("click", () => {
      // handle box click logic
    });

    visualizeMaze.appendChild(newCell);
  }
}

const indicateStart = (numItemsWidth, numItemsHeight) => {
  start[0] = Math.floor(numItemsHeight / 2);
  start[1] = Math.floor(numItemsWidth / 5);
  return start[1] + start[0] * numItemsWidth;
};

const indicateFinish = (numItemsWidth, numItemsHeight) => {
  finish[0] = Math.floor(numItemsHeight / 2);
  finish[1] = Math.floor(numItemsWidth * 4 / 5);
  return finish[1] + finish[0] * numItemsWidth;
};

//////////////////// Utility Functions ////////////////////

const clearPath = () => {
  for (let i = 0; i < numItems; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    if (currentCell.classList.contains("maze-cell-path")) {
      currentCell.classList.remove("maze-cell-path");
      currentCell.classList.add("maze-cell-open");
    }
  }
}

const clearMaze = () => {
  for (let i = 0; i < numItems; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    if (!currentCell.classList.contains("maze-cell-start") && !currentCell.classList.contains("maze-cell-finish")) {
      currentCell.classList.remove("maze-cell-closed");
      currentCell.classList.remove("maze-cell-path");
      currentCell.classList.add("maze-cell-open");
    }
  }
};

//////////////////// Event Listeners ////////////////////

visualizeButtonClearPath.addEventListener("click", () => {
  clearPath();
});

visualizeButtonClearMaze.addEventListener("click", () => {
  clearMaze();
});

visualizeButtonGenerateMaze.addEventListener("click", () => {
  clearMaze();
  for (let i = 0; i < numItems; i++) {
    let currentCell = document.getElementById(`cell-${i}`);
    let indicator = Math.random();
    if (indicator < 0.3) {
      if (!currentCell.classList.contains("maze-cell-start") && !currentCell.classList.contains("maze-cell-finish")) {
        currentCell.classList.remove("maze-cell-open");
        currentCell.classList.add("maze-cell-closed");
      }
    }
  }
});

visualizeButtonSolve.addEventListener("click", () => {
  let grid = setLinearGrid(document, numItems); // obtain linear grid
  grid = convertListToMatrix(grid, numItemsHeight, numItemsWidth); // convert linear grid to matrix
  
  // update maze object
  maze.setGrid(grid);
  maze.setStart(start);
  maze.setFinish(finish);

  const path = maze.solve();
  markPath(document, path, numItemsWidth);
});


/**
 * Event listener for the generate grid button
 * @pre  - document elements: correctly defined and point to their corresponding elements on the web page
 *        + 'root'
 *        + 'inputGridRows'
 *        + 'inputGridColumns'
 *        + 'gridContainer'
 *       - grid dimension entries are positive integers larger than 2
 * @post - in case of invalid grid dimension entries, an alert is displayed to the user and no grid is generated
 *       - enable and clear input fields
 *       - setup page is hided
 *       - maze solver grid and menu are unhided
 *       - grid is generated using 'inputGridRows' and 'inputGridColumns' input values
 *       - grid cells are assigned IDs "cell-i", with 'i' corresponding to their index
 *       - grid cells are assigned event listeners for opening/closing upon click
 */ /*
buttonGenerate.addEventListener("click", () => {
  // check input validity
  const numRows = inputGridRows.value;
  const numColumns = inputGridColumns.value;
  if (numRows <= 0 || numColumns <= 0 // prohibit non-positive entries
    || !Number.isInteger(+numRows) || !Number.isInteger(+numColumns) // prohibit non-integer entries
    || numRows < 2 || numColumns < 2) { // prohibit entries smaller than 2
    alert("ERROR!\nRow & column entries must be positive integers larger than 2.");
    return;
  } else if (numRows >= 30 || numColumns >= 30) {
    alert("ERROR!\nNumber of rows or columns cannot exceed 30.");
    return;
  }
  
  // enable and clear input fields
  inputStartRow.disabled = false;
  inputStartRow.value = "";

  inputStartColumn.disabled = false;
  inputStartColumn.value = "";

  inputFinishRow.disabled = false;
  inputFinishRow.value = "";

  inputFinishColumn.disabled = false;
  inputFinishColumn.value = "";
  
  // initialization
  const numCells = numRows * numColumns;
  root.style.setProperty("--numColumns", numColumns); // update grid layout number of columns
  const gridSideLength = parseInt(getComputedStyle(root).getPropertyValue("--gridSideLength"));
  const largestDivisor = +numRows > +numColumns ? numRows : numColumns;
  root.style.setProperty("--cellSideLength", gridSideLength / largestDivisor + "px");

  // dynamically fill out the grid
  for (let i = 0; i < numCells; i++) {
    const newCell = document.createElement("button");
    newCell.classList.add("grid-item", "open-cell");
    newCell.setAttribute("id", "cell-" + i);
    
    // event listener for opening/closing upon click
    newCell.addEventListener("click", () => {
      if (newCell.classList.contains("open-cell")) {
        newCell.classList.remove("open-cell");
        newCell.classList.add("closed-cell");
      } else {
        newCell.classList.remove("closed-cell");
        newCell.classList.add("open-cell");
      }
    });
    
    gridContainer.appendChild(newCell);
  }

  setupContainer.classList.add("hide");
  mazeSolverContainer.classList.remove("hide");
}); */

/**
 * Event listener for the solve button
 * @pre  - document elements: correctly defined and point to their corresponding elements on the web page
 *        + 'maze' is an object representing the maze
 *        + 'buttonSolve'
 *        + 'gridContainer'
 *       - utility functions: imported and preconditions are met
 *        + 'setLinearGrid'
 *        + 'convertListToMatrix'
 *        + 'markPath'
 * @post - menu input fields are disabled
 *       - appropriate object is returned
 *       - maze properties are updated: grid, start, finish
 * @returns - returns a 1D list representing the grid
 *          - 0 indicates open cell
 *          - 1 indicates closed cell
 */ /*
buttonSolve.addEventListener("click", () => {
  try {
    // set up grid
    // 'var' declaration is used for 'numColumns' for function scoping (required for 'markPath()' outside of try-catch block)
    var numColumns = inputGridColumns.value;
    const numCells = gridContainer.childElementCount;
    let grid = setLinearGrid(document, numCells); // obtain linear grid
    grid = convertListToMatrix(grid, inputGridRows.value, numColumns); // convert linear grid to matrix

    // update maze object
    const startCoordinate = [parseInt(inputStartRow.value), parseInt(inputStartColumn.value)];
    const finishCoordinate = [parseInt(inputFinishRow.value), parseInt(inputFinishColumn.value)];

    maze.setGrid(grid);
    maze.setStart(startCoordinate);
    maze.setFinish(finishCoordinate);
  } catch (error) {
    alert("ERROR!\nStart & finish entries must be positive integers within the grid.");
    return;
  }

  // disable input fields
  inputStartRow.disabled = true;
  inputStartColumn.disabled = true;
  inputFinishRow.disabled = true;
  inputFinishColumn.disabled = true;

  // solve maze and mark path
  const path = maze.solve();
  markPath(document, path, numColumns);
}); */

/**
 * Event listener for the reset grid button
 * @pre  - document elements: correctly defined and point to their corresponding elements on the web page
 *        + 'gridContainer'
 *        + 'solveMazeContainer'
 *        + 'setupContainer'
 * @post - setup page is unhided
 *       - maze solver grid and menu are hided
 * Note: postconditions are the opposite of 'buttonGenerate' even listener
 */ /*
buttonReset.addEventListener("click", () => {
  gridContainer.innerHTML = ""; // clear grid cells (children)
  mazeSolverContainer.classList.add("hide");
  setupContainer.classList.remove("hide");
}); */
setupMaze();