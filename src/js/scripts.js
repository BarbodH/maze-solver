import Maze from "./maze-model/maze.js";
import { convertCoordinateToIndex, convertIndexToCoordinate, setLinearGrid } from "./utilities.js";
import { convertListToMatrix } from "./utilities.js";
import { markPath } from "./utilities.js";
import { clearPath } from "./utilities.js";
import { clearMaze } from "./utilities.js";
import { generateMaze } from "./utilities.js";
import { indicateStart } from "./utilities.js";
import { indicateFinish } from "./utilities.js";

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
const visualizeSelectAlgorithm = document.getElementById("visualize-select-algorithm");
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
    // double-click behaviour: (open -> start), (closed -> start), (start -> N/A), (finish -> N/A)
    newCell.addEventListener("dblclick", () => {
      if (!newCell.classList.contains("maze-cell-start") && !newCell.classList.contains("maze-cell-finish")) {
        // mark the current cell as a starting point
        newCell.classList.remove("maze-cell-open");
        newCell.classList.remove("maze-cell-closed");
        newCell.classList.add("maze-cell-start");
        
        // open the old start cell, since there can't be multiple starting points
        let oldStartIndex = convertCoordinateToIndex(start, numCellsWidth);
        let oldStartButton = document.getElementById(`cell-${oldStartIndex}`);
        oldStartButton.classList.remove("maze-cell-start");
        oldStartButton.classList.add("maze-cell-open");
        // update the 'start' coordinate global variable
        start = convertIndexToCoordinate(i, numCellsWidth);
      }
    });
    // right-click behaviour: (open -> finish), (closed -> finish), (start -> N/A), (finish -> N/A)
    newCell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      
      if (!newCell.classList.contains("maze-cell-start") && !newCell.classList.contains("maze-cell-finish")) {
        // mark the current cell as a finish point
        newCell.classList.remove("maze-cell-open");
        newCell.classList.remove("maze-cell-closed");
        newCell.classList.add("maze-cell-finish");

        // open the old finish cell, since there can't be multiple finish points
        let oldFinishIndex = convertCoordinateToIndex(finish, numCellsWidth);
        let oldFinishButton = document.getElementById(`cell-${oldFinishIndex}`);
        oldFinishButton.classList.remove("maze-cell-finish");
        oldFinishButton.classList.add("maze-cell-open");
        // update the 'finish' coordinate global variable
        finish = convertIndexToCoordinate(i, numCellsWidth);
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
  clearPath(document, numCells);
  
  let grid = setLinearGrid(document, numCells); // obtain linear grid
  grid = convertListToMatrix(grid, numCellsHeight, numCellsWidth); // convert linear grid to matrix
  
  // update maze object
  maze.setGrid(grid);
  maze.setStart(start);
  maze.setFinish(finish);

  // retrieve the selected algorithm value and solve accordingly
  let selectedAlgorithm = visualizeSelectAlgorithm.value;
  let path;
  if (selectedAlgorithm === "backtracking") path = maze.backtracking();
  else if (selectedAlgorithm === "bfs") path = maze.bfs();

  if (path && path.length > 0) markPath(document, path, numCellsWidth);
  else alert("The maze is unsolvable!");
});

//////////////////// Page Load ////////////////////

setupMaze();
