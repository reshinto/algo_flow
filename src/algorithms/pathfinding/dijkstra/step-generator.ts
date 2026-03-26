import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const DIJKSTRA_LINE_MAP = buildLineMapFromSources("dijkstra");

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
