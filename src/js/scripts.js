import Maze from "./maze-model/maze.js";
import { convertCoordinateToIndex, convertIndexToCoordinate, setLinearGrid } from "./utilities.js";
import { convertListToMatrix } from "./utilities.js";
import { markPath } from "./utilities.js";
import { clearPath } from "./utilities.js";
import { clearMaze } from "./utilities.js";
import { generateMaze } from "./utilities.js";
import { indicateStart } from "./utilities.js";
import { indicateFinish } from "./utilities.js";
import { generateBarChart } from "./visualization.js";

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
const visualizeButtonAssess = document.getElementById("visualize-button-assess");

// assess
const assessContainer = document.getElementById("assess-container");
const assessButtonExit = document.getElementById("assess-button-exit");
const assessButtonGenerateReport = document.getElementById("assess-button-generate-report");
const assessCheckboxBacktracking = document.getElementById("assess-checkbox-backtracking");
const assessCheckboxBfs = document.getElementById("assess-checkbox-bfs");
const assessCheckboxDfs = document.getElementById("assess-checkbox-dfs");
const assessChartContainer = document.getElementById("assess-chart-container");

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
visualizeButtonSolve.addEventListener("click", async () => {
  clearPath(document, numCells);
  
  let selectedAlgorithm = visualizeSelectAlgorithm.value;
  let path = await solveMaze(selectedAlgorithm, true);

  if (path && path.length > 0) markPath(document, path, numCellsWidth);
  else alert("The maze is unsolvable!");
});

/**
 * Event listener for the performance report exit button.
 */
assessButtonExit.addEventListener("click", () => {
  assessContainer.classList.add("hide");
  const oldChart = document.getElementById("assess-chart");
  oldChart.remove();
});

/**
 * Event listener for the 'Generate Report' button.
 * Generates a bar chart using D3.js based on number of steps in paths.
 */
assessButtonGenerateReport.addEventListener("click", async () => {
  // determine which algorithms are selected by the user
  const algorithms = {};
  if (assessCheckboxBacktracking.checked) {
    algorithms["backtracking"] = {
      name: "Recursive Backtracking",
      pathLength: 0
    };
  }
  if (assessCheckboxBfs.checked) {
    algorithms["bfs"] = {
      name: "Breadth-First Search",
      pathLength: 0
    };
  }
  if (assessCheckboxDfs.checked) {
    algorithms["dfs"] = {
      name: "Depth-First Search",
      pathLength: 0
    };
  }

  if (Object.keys(algorithms).length === 0) {
    alert("No algorithm is selected!");
    return;
  }
  
  // determine the path length for each algorithm
  // prepare algorithms object to be handled by D3.js for visualization
  let path;
  for (let key in algorithms) {
    if (algorithms.hasOwnProperty(key)) {
      path = await solveMaze(key, false);
      if (path && path.length > 0) algorithms[key].pathLength = path.length;
      else alert("The maze is unsolvable!");
    }
  }

  generateBarChart(assessChartContainer, Object.values(algorithms));
  assessContainer.classList.remove("hide");
});

/**
 * Helper method for preparing <code>maze</code> to be solved.
 * @param {String} algorithm 
 * @returns the path from start to finish using the given algorithm.
 */
const solveMaze = async (algorithm, visualize) => {
  // set up the maze
  let grid = setLinearGrid(document, numCells);
  grid = convertListToMatrix(grid, numCellsHeight, numCellsWidth);
  maze.setGrid(grid);
  maze.setStart(start);
  maze.setFinish(finish);

  // solve the maze based on the desired algorithm
  let path;
  if (visualize) {
    if (algorithm === "backtracking") path = await maze.backtracking(document);
    else if (algorithm === "bfs") path = await maze.bfs(document);
    else if (algorithm === "dfs") path = await maze.dfs(document);
  } else {
    if (algorithm === "backtracking") path = maze.backtracking();
    else if (algorithm === "bfs") path = maze.bfs();
    else if (algorithm === "dfs") path = maze.dfs();
  }

  return path;
}

//////////////////// Page Load ////////////////////

setupMaze();

const connectCellObserver = (observer) => {
  for (const cell of document.querySelectorAll(".maze-cell")) {
    observer.observe(cell, { attributes: true, attributeFilter: ["class"] });
  }
}

const cellObserver = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes") {
      const mutatedCell = mutation.target;
      if (mutatedCell.classList.contains("maze-cell-visited")) {
        animateVisitedCell(mutatedCell);
      }
    }
  }
});

connectCellObserver(cellObserver);

const removeAnimationClass = async (cell) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  cell.classList.remove("maze-cell-bounce-animation");
};

const animateVisitedCell = async (cell) => {
  cellObserver.disconnect();
  cell.classList.add("maze-cell-bounce-animation");
  connectCellObserver(cellObserver);
  removeAnimationClass(cell);
};
