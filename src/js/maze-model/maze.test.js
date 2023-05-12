import Maze from './maze';

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

//////////////////// test cases for maze solving algorithm ////////////////////

test("Test maze solving algorithm - solvable maze #1", () => {
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
  const path = maze.solve();
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

test("Test maze solving algorithm - unsolvable maze #1", () => {
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
  const path = maze.solve();
  const solution = [];
  expect(path).toEqual(solution);
});
