# Solve Me!

This is a static web application for visualizing the functionality of various graph search algorithms.

## Run the App

The file `app.js` in the main directory implements a pure JavaScript server without any frameworks.

```
node app.js
```

By default, the localhost server will be hosted on port 8000.
Though, `app.js` can take an optional parameter, specifying the desired port number to be used.
If an invalid port number is provided, an error message will be returned.
- Valid port number range: [1, 65535]

Alternatively, any other tools for launching a localhost server, such as *Go Live* on Visual Studio Code, can be used for running this application.

## Brief Tutorial

- **Click**: closes an open cell and vice versa 
- **Double-click**: sets it as the new start point
- **Right-click**: sets the cell as the new finish point

Note that the maze can only have one start and finish point.
For the purpose of convenience, a custom maze can be generated using the **Generate Maze** button as well.

**Page responsiveness**: the maze dimensions and initial start/finish points are set based on the window dimensions.
Upon resizing the window, the page automatically reloads and the maze is reset accordingly.

## Testing

Jest setup and configuration tutorial: [Install Jest Testing Framework with npm for ES6 module support - JavaScript Testing](https://www.youtube.com/watch?v=ZnIv8u2-XrA)

The file `maze.test.js` contains all the unit tests for the Maze model in `/src/js/maze-model`.

```
npm test
```

## Algorithms

### Breath-First Search (BFS)

This function is a custom implementation of the well-known BFS graph traversal algorithm.
In terms of functionality, BFS scans the maze from all directions, allowing it to find the shortest path between the start and finish points.

Upon visiting a new node, all its neighbouring nodes are visited before moving on, and a queue data structure is employed.

[<img src="/images/bfs-sample.png" align="center" height="400" hspace="2" vspace="2">](/images/bfs-sample.png")
<br>*Sample run of breadth-first search (BFS)*

### Depth-First Search (DFS)

This function is a custom implementation of the well-known DFS graph traversal algorithm.
In terms of functionality, DFS scans the maze in a particular direction (depth), allowing it to be quicker for solving particular mazes but considerably slower for others.
Nonetheless, the path lengths will always be greater than or equal to BFS, but never shorter.

Upon visiting a new node, all the neighbouring nodes of its neighbouring nodes are visited before moving on, and a stack data structure is employed.

[<img src="/images/dfs-sample.png" align="center" height="400" hspace="2" vspace="2">](/images/dfs-sample.png")
<br>*Sample run of depth-first search (DFS)*

### Recursive Backtracking

This function is the first-ever pathfinding algorithm that I implemented without prior knowledge of data structures and algorithms.
It is inefficient, especially for mazes with trivial solutions.
Nevertheless, it is a fantastic demonstration of the importance of learning data structures and algorithms for programmers in order to develop efficient solutions.

[<img src="/images/backtracking-sample.png" align="center" height="400" hspace="2" vspace="2">](/images/backtracking-sample.png")
<br>*Sample run of recursive backtracking*

## Assessment

The D3.js data visualization library was utilized to create a bar chart, displaying the path length of the selected algorithm(s) for a given maze.

[<img src="/images/chart-sample.png" align="center" height="400" hspace="2" vspace="2">](/images/chart-sample.png")
<br>*Sample path length chart for recursive backtracking, BFS, and DFS, displayed in descending order*
