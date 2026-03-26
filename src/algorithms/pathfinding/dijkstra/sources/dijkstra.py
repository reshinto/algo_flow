import heapq
from typing import List, Tuple, Optional


def dijkstra(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)
    col_count = len(grid[0])
    distance = [[float("inf")] * col_count for _ in range(row_count)]
    distance[start[0]][start[1]] = 0
    parent = [[None] * col_count for _ in range(row_count)]
    open_set = [(0, start[0], start[1])]
    visited_set = [[False] * col_count for _ in range(row_count)]

    while open_set:
        current_dist, current_row, current_col = heapq.heappop(open_set)
        if visited_set[current_row][current_col]:
            continue
        visited_set[current_row][current_col] = True

        if current_row == end[0] and current_col == end[1]:
            path = reconstruct_path(parent, end)
            return {"path": path, "visited": []}

        for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue
            if visited_set[neighbor_row][neighbor_col]:
                continue

            new_distance = distance[current_row][current_col] + 1
            if new_distance < distance[neighbor_row][neighbor_col]:
                distance[neighbor_row][neighbor_col] = new_distance
                parent[neighbor_row][neighbor_col] = (current_row, current_col)
                heapq.heappush(open_set, (new_distance, neighbor_row, neighbor_col))

    return {"path": [], "visited": []}


def reconstruct_path(
    parent: List[List[Optional[Tuple[int, int]]]],
    end: Tuple[int, int],
) -> List[Tuple[int, int]]:
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent[current[0]][current[1]]
    path.reverse()
    return path
