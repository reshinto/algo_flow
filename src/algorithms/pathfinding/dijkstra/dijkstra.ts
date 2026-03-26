import type { GridCell } from "@/types";

export interface DijkstraResult {
  path: [number, number][];
  visited: [number, number][];
}

export function dijkstra(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): DijkstraResult {
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;
  const visited: [number, number][] = [];

  /* Distance map: distance[row][col] = shortest known distance from start */
  const distance: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  distance[start[0]]![start[1]] = 0;

  /* Parent map for path reconstruction */
  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  /* Simple priority queue backed by a sorted array */
  const openSet: { row: number; col: number; dist: number }[] = [
    { row: start[0], col: start[1], dist: 0 },
  ];

  const visitedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (openSet.length > 0) {
    /* Sort by distance ascending and take the closest node */
    openSet.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
    const current = openSet.shift()!;

    if (visitedSet[current.row]![current.col]) continue;
    visitedSet[current.row]![current.col] = true;
    visited.push([current.row, current.col]);

    /* Check if we reached the end */
    if (current.row === end[0] && current.col === end[1]) {
      const path = reconstructPath(parent, end);
      return { path, visited };
    }

    /* Explore 4-directional neighbors */
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
      }
    }
  }

  /* No path found */
  return { path: [], visited };
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
