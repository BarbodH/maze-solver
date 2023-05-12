import Maze from "./maze-solver/maze.js";
import { setLinearGrid } from "./utilities/scripts-helpers.js";
import { convertListToMatrix } from "./utilities/scripts-helpers.js";
import { markPath } from "./utilities/scripts-helpers.js";
import { clearPath } from "./utilities/scripts-helpers.js";
import { clearMaze } from "./utilities/scripts-helpers.js";
import { generateMaze } from "./utilities/scripts-helpers.js";
import { indicateStart } from "./utilities/scripts-helpers.js";
import { indicateFinish } from "./utilities/scripts-helpers.js";

//////////////////// Element Initializations ////////////////////

const root = document.documentElement;

// global constants
// variables initialized with 'let' will later be frozen when the maze is set up
const MAZE_CELL_SIDE_LENGTH = 25;
let numCells;
let numCellsWidth;
let numCellsHeight;

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

/**
 * Initializes the maze grid based on screen dimensions and maze cell side length.
 */
const setupMaze = () => {
  // retrieve current screen's dimensions
  const containerWidth = visualizeContainerMaze.getBoundingClientRect().width;
  const containerHeight = visualizeContainerMaze.getBoundingClientRect().height;
  
  // calculate the number of cells for screen height & width based on cell side length
  numCellsWidth = Math.floor(containerWidth / MAZE_CELL_SIDE_LENGTH);
  numCellsHeight = Math.floor(containerHeight / MAZE_CELL_SIDE_LENGTH);
  numCells = numCellsWidth * numCellsHeight;
  // freeze variables into constants to prevent further modification
  Object.freeze({ numCells, numCellsWidth, numCellsHeight });

  // set the number of columns for the grid view containing the maze
  root.style.setProperty("--num-maze-columns", numCellsWidth.toString());

  // indicate start & finish points based on screen dimensions
  // by default, the points are aligned horizontally (1/2 height of screen)
  // by default, the points are 1/5 of total width away from their respectiv edge
  // start: left, finish: right
  const indexStart = indicateStart(numCellsWidth, numCellsHeight, start);
  const indexFinish = indicateFinish(numCellsWidth, numCellsHeight, finish);
  
  // create cells (HTML buttons) and fill out the maze grid
  for (let i = 0; i < numCells; i++) {
    let newCell = document.createElement("button");
    
    // assign maze-cell-open classes to all cells, except for start and finish
    // start cell class: maze-cell-start, finish cell class: maze-cell-finish
    if (i == indexStart) newCell.classList.add("maze-cell", "maze-cell-start")
    else if (i == indexFinish) newCell.classList.add("maze-cell", "maze-cell-finish");
    else newCell.classList.add("maze-cell", "maze-cell-open");

    // assign ID and add event listener to each listener to handle user clicking
    // click behaviour: (open -> closed), (closed -> open)
    newCell.setAttribute("id", `cell-${i}`)
    newCell.addEventListener("click", () => {
      if (newCell.classList.contains("maze-cell-open")) {
        newCell.classList.remove("maze-cell-open");
        newCell.classList.add("maze-cell-closed");
      } else {
        newCell.classList.remove("maze-cell-closed");
        newCell.classList.add("maze-cell-open");
      }
    });

    visualizeMaze.appendChild(newCell);
  }
}

//////////////////// Event Listeners ////////////////////

/**
 * Event listener for the 'Clear Path' button.
 */
visualizeButtonClearPath.addEventListener("click", () => {
  clearPath(document, numCells);
});

/**
 * Event listener for the 'Clear Maze' button
 */
visualizeButtonClearMaze.addEventListener("click", () => {
  clearMaze(document, numCells);
});

/**
 * Event listener for the 'Generate Maze' button
 */
visualizeButtonGenerateMaze.addEventListener("click", () => {
  generateMaze(document, numCells);
});

/**
 * Event listener for the 'Solve' button.
 * Updates the <code>maze</code>, retrieves the solution, and marks the path on the maze.
 */
visualizeButtonSolve.addEventListener("click", () => {
  let grid = setLinearGrid(document, numCells); // obtain linear grid
  grid = convertListToMatrix(grid, numCellsHeight, numCellsWidth); // convert linear grid to matrix
  
  // update maze object
  maze.setGrid(grid);
  maze.setStart(start);
  maze.setFinish(finish);

  const path = maze.solve();
  markPath(document, path, numCellsWidth);
});

//////////////////// Page Load ////////////////////

setupMaze();
