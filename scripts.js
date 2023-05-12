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

const generateMaze = () => {
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
};

//////////////////// Event Listeners ////////////////////

visualizeButtonClearPath.addEventListener("click", () => {
  clearPath();
});

visualizeButtonClearMaze.addEventListener("click", () => {
  clearMaze();
});

visualizeButtonGenerateMaze.addEventListener("click", () => {
  generateMaze();
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

//////////////////// Page Load ////////////////////

setupMaze();
