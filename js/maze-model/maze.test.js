import Maze from './maze.js';

//////////////////// test cases for validateStart ////////////////////

test("Test validateStart - 'start' must be an array", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = 2;
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' must be an array!");
});

test("Test validateStart - 'start' must be an array of length 2", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [1, 0, 1];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' must be an array of length 2!");
});

test("Test validateStart - 'start' entries must be integers", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [1, "word"];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' entries must be integers!");
});

test("Test validateStart - 'start' entries cannot be negative #1", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [-1, 1];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' entries cannot be negative!");
});

test("Test validateStart - 'start' entries cannot be negative #2", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [1, -1];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' entries cannot be negative!");
});

test("Test validateStart - 'start' first entry cannot exceed the number of rows in 'grid'", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [3, 2];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' first entry cannot exceed the number of rows in 'grid'!");
});

test("Test validateStart - 'start' second entry cannot exceed the number of columns in 'grid'", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [2, 3];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' second entry cannot exceed the number of columns in 'grid'!");
});

test("Test validateStart - 'start' cannot be located on a closed cell", () => {
  const grid = [[1, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'start' cannot be located on a closed cell!");
});

//////////////////// test cases for validateFinish ////////////////////

test("Test validateFinish - 'finish' must be an array", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = 2;
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' must be an array!");
});

test("Test validateFinish - 'finish' must be an array of length 2", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, 0, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' must be an array of length 2!");
});

test("Test validateFinish - 'finish' entries must be integers", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, "word"];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' entries must be integers!");
});

test("Test validateFinish - 'finish' entries cannot be negative #1", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [-1, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' entries cannot be negative!");
});

test("Test validateFinish - 'finish' entries cannot be negative #2", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, -1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' entries cannot be negative!");
});

test("Test validateFinish - 'finish' first entry cannot exceed the number of rows in 'grid'", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [3, 2];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' first entry cannot exceed the number of rows in 'grid'!");
});

test("Test validateFinish - 'finish' second entry cannot exceed the number of columns in 'grid'", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [2, 3];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' second entry cannot exceed the number of columns in 'grid'!");
});

test("Test validateFinish - 'finish' cannot be located on a closed cell", () => {
  const grid = [[0, 0, 1], [0, 1, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'finish' cannot be located on a closed cell!");
});

//////////////////// test cases for validateGrid ////////////////////

test("Test validateGrid - 'grid' must be an array", () => {
  const grid = 2;
  const start = [0, 0];
  const finish = [1, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'grid' must be an array!");
});

test("Test validateGrid - 'grid' entries must be integers", () => {
  const grid = [[0, 0, 1], [0, "word", 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, 1];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'grid' entries must be integers!");
});

test("Test validateGrid - 'grid' entries must only contain 0's and 1's", () => {
  const grid = [[1, 0, 1], [0, 0, 1], [5, 0, 0]];
  const start = [0, 0];
  const finish = [0, 0];
  expect(() => {
    new Maze(grid, start, finish);
  }).toThrow("'grid' entries must only contain 0's and 1's!");
});

//////////////////// test cases for accessor methods ////////////////////

test("Test accessor method - getGrid", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [1, 1];
  const finish = [0, 0];
  const maze = new Maze(grid, start, finish);
  expect(maze.getGrid()).toBe(grid);
});

test("Test accessor method - getStart", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [1, 1];
  const finish = [0, 0];
  const maze = new Maze(grid, start, finish);
  expect(maze.getStart()).toBe(start);
});

test("Test accessor method - getFinish", () => {
  const grid = [[0, 0, 1], [0, 0, 1], [0, 0, 0]];
  const start = [0, 0];
  const finish = [1, 1];
  const maze = new Maze(grid, start, finish);
  expect(maze.getFinish()).toBe(finish);
});

//////////////////// Test Cases for Maze Solving Algorithms' Helper Methods ////////////////////

test("Test helper method - validateCoordinate #1", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [-1, 3];
  expect(maze._validateCoordinate(coordinate)).toBe(false);
});

test("Test helper method - validateCoordinate #2", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [3, -1];
  expect(maze._validateCoordinate(coordinate)).toBe(false);
});

test("Test helper method - validateCoordinate #3", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [5, 3];
  expect(maze._validateCoordinate(coordinate)).toBe(false);
});

test("Test helper method - validateCoordinate #4", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [3, 5];
  expect(maze._validateCoordinate(coordinate)).toBe(false);
});

test("Test helper method - validateCoordinate #5", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [3, 2];
  expect(maze._validateCoordinate(coordinate)).toBe(true);
});

test("Test helper method - getCell #1", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [3, 2];
  expect(maze._getCell(grid, coordinate)).toBe(0);
});

test("Test helper method - getCell #2", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [4, 3];
  expect(maze._getCell(grid, coordinate)).toBe(0);
});

test("Test helper method - getCell #3", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [0, 4];
  expect(maze._getCell(grid, coordinate)).toBe(1);
});

test("Test helper method - getCell #4", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const coordinate = [2, 2];
  expect(maze._getCell(grid, coordinate)).toBe(1);
});

test("Test helper method - getCurrentCoordinate #1", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2]
  ];
  expect(maze._getCurrentCoordinate(path)).toEqual([3, 2]);
});

test("Test helper method - getCurrentCoordinate #", () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 8]
  ];
  expect(maze._getCurrentCoordinate(path)).toEqual([4, 8]);
});

test("Test helper method - xfs with invalid input", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  maze._xfs("invalid input").catch(error => {
    expect(error.message).toBe("The provided algorithm must be either 'bfs' or 'dfs'!");
  });
});

//////////////////// Test Cases for Maze Solving Algorithm: Recursive Backtracking ////////////////////

test("Test maze solving algorithm (recursive backtracking) - solvable maze", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.backtracking();
  const solution = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 3],
    [4, 4]
  ];
  expect(path).toEqual(solution);
});

test("Test maze solving algorithm (recursive backtracking) - unsolvable maze", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.backtracking();
  const solution = [];
  expect(path).toEqual(solution);
});

//////////////////// Test Cases for Maze Solving Algorithm: Breadth-First Search (BFS) ////////////////////

test("Test maze solving algorithm (breadth-first search) - solvable maze #1", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.bfs();
  const solution = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 3],
    [4, 4]
  ];
  expect(path).toEqual(solution);
});

test("Test maze solving algorithm (breadth-first search) - solvable maze #2", async () => {
  const grid = [
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [9, 9];
  const maze = new Maze(grid, start, finish);
  const path = await maze.bfs();
  const solution = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [5, 1],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
    [8, 7],
    [8, 8],
    [9, 8],
    [9, 9]
  ];
  expect(path).toEqual(solution);
});

test("Test maze solving algorithm (breadth-first search) - unsolvable maze", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.bfs();
  const solution = [];
  expect(path).toEqual(solution);
});

//////////////////// Test Cases for Maze Solving Algorithm: Depth-First Search (DFS) ////////////////////

test("Test maze solving algorithm (depth-first search) - solvable maze #1", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.dfs();
  const solution = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 3],
    [4, 4]
  ];
  expect(path).toEqual(solution);
});

test("Test maze solving algorithm (depth-first search) - solvable maze #2", async () => {
  const grid = [
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [9, 9];
  const maze = new Maze(grid, start, finish);
  const path = await maze.dfs();
  const solution = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 8],
    [4, 9],
    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 9]
  ];
  expect(path).toEqual(solution);
});

test("Test maze solving algorithm (depth-first search) - unsolvable maze", async () => {
  const grid = [
    [0, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0]
  ];
  const start = [0, 0];
  const finish = [4, 4];
  const maze = new Maze(grid, start, finish);
  const path = await maze.dfs();
  const solution = [];
  expect(path).toEqual(solution);
});