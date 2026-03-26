import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * Dijkstra's Algorithm finds the shortest path on a weighted grid using
 * a priority queue (sorted array here, giving O(V^2)). All edge weights
 * are uniform (1). Distance is initialised to Infinity for every cell
 * except the start (0). Parent pointers enable path reconstruction once
 * the end cell is reached.
 */
const DIJKSTRA_LINE_MAP: LineMap = {
  /* Build distance, parent, openSet, and visitedSet data structures */
  initialize: {
    typescript: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    python: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    java: [3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  /* Seed the frontier with the start cell */
  "open-node": {
    typescript: [11, 12],
    python: [14, 15, 16],
    java: [13, 14],
  },
  /* Extract minimum-distance node; skip if already visited; mark visited */
  "close-node": {
    typescript: [15, 16, 17, 18],
    python: [19, 20, 21, 22],
    java: [20, 21, 22, 23, 24, 25],
  },
  /* Relax the edge: update distance if a shorter path is found */
  "update-cost": {
    typescript: [36, 37, 38],
    python: [40, 41, 42, 43, 44],
    java: [39, 40, 41, 42, 43],
  },
  /* End cell reached — reconstruct the shortest path via parent pointers */
  "trace-path": {
    typescript: [20, 21],
    python: [24, 25],
    java: [27, 28],
  },
  /* Open set exhausted without reaching end — no path exists */
  complete: {
    typescript: [44],
    python: [46],
    java: [48],
  },
};

interface DijkstraInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateDijkstraSteps(input: DijkstraInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, DIJKSTRA_LINE_MAP);

  /* Distance map */
  const distance: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  distance[startPosition[0]]![startPosition[1]] = 0;

  /* Parent map for path reconstruction */
  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  /* Simple priority queue */
  const openSet: { row: number; col: number; dist: number }[] = [];

  const visitedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
  });

  /* Add start to open set */
  openSet.push({ row: startPosition[0], col: startPosition[1], dist: 0 });
  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    distance: 0,
  });

  while (openSet.length > 0) {
    openSet.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
    const current = openSet.shift()!;

    if (visitedSet[current.row]![current.col]) continue;
    visitedSet[current.row]![current.col] = true;

    tracker.closeNode(current.row, current.col, {
      currentNode: [current.row, current.col],
      currentDistance: current.dist,
    });

    /* Check if we reached the end */
    if (current.row === endPosition[0] && current.col === endPosition[1]) {
      const path = reconstructPath(parent, endPosition);
      tracker.tracePath(path, {
        pathLength: path.length,
        path,
      });
      tracker.complete({ pathFound: true, pathLength: path.length }, true);
      return tracker.getSteps();
    }

    /* Explore neighbors */
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = current.row + deltaRow;
      const neighborCol = current.col + deltaCol;

      if (
        neighborRow < 0 ||
        neighborRow >= rowCount ||
        neighborCol < 0 ||
        neighborCol >= colCount
      ) {
        continue;
      }

      const neighborCell = grid[neighborRow]![neighborCol]!;
      if (neighborCell.type === "wall") continue;
      if (visitedSet[neighborRow]![neighborCol]) continue;

      const newDistance = distance[current.row]![current.col]! + 1;
      if (newDistance < distance[neighborRow]![neighborCol]!) {
        distance[neighborRow]![neighborCol] = newDistance;
        parent[neighborRow]![neighborCol] = [current.row, current.col];
        openSet.push({ row: neighborRow, col: neighborCol, dist: newDistance });

        tracker.openNode(neighborRow, neighborCol, {
          neighborNode: [neighborRow, neighborCol],
          newDistance,
          parentNode: [current.row, current.col],
        });
      }
    }
  }

  /* No path found */
  tracker.complete({ pathFound: false }, false);
  return tracker.getSteps();
}

function reconstructPath(
  parent: ([number, number] | null)[][],
  end: [number, number],
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = end;

  while (current !== null) {
    path.unshift(current);
    current = parent[current[0]]![current[1]]!;
  }

  return path;
}
